const usersRouter = require('express').Router();
const User = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const { PAGE_URL } = require('../config');
const { userExtractor } = require('../middleware/auth');


usersRouter.post('/', async (request, response) =>{
    const { idNumber, name, birthdate, email, phone, password } = request.body;
    
    if (!idNumber || !name || !birthdate || !email || !phone || !password ){
        return response.status(400).json({ error: 'Todos los datos son requeridos' });
    }

    const userExist = await User.findOne({ email });

    if (userExist){
      return response.status(400).json({ error: 'EL correo electronico ya está en uso' });
    };
   

    const saltRounds = 10;
    
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
        idNumber,
        name,
        birthdate,
        email,
        phone,
        passwordHash,
    });

    const savedUser = await newUser.save();
    console.log(savedUser);

    const token = jwt.sign({ id: savedUser.id }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '5d',
    }); 

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // Use `true` for port 465, `false` for all other ports
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      await transporter.sendMail({
        from: process.env.EMAIL_USER, // sender address
        to: savedUser.email, // list of receivers
        subject: "Verificación de Usuario ✔", // Subject line
        html: `
        <!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Verificación de Correo</title>
<style>
    body {
        background-color: #f7f7f7;
        font-family: 'Roboto', sans-serif;
        margin: 0;
        padding: 0;
    }
    .container {
        max-width: 800px;
        margin: 30px auto;
        padding: 40px; /* Aumentado el padding para más espacio */
        background-color: #ffffff;
        border: 1px solid #ddd;
        text-align: left; /* Alinea el texto a la izquierda */
        box-shadow: 0 4px 8px rgba(0,0,0,0.05);
        border-radius: 5px;
    }
    .button {
        display: inline-block;
        padding: 10px 20px;
        margin: 20px 0;
        background-color: #8c5fa1; /* Color del botón */
        color: #ffffff;
        text-decoration: none;
        border-radius: 5px;
        font-weight: bold;
    }
    .footer {
        font-size: 12px;
        color: #777777;
        margin-top: 20px;
    }
    .header {
        font-weight: bold; /* Hace el título en negritas */
    }
</style>
</head>
<body>
<div class="container">
    
    <h1 class="header">¡Ya casi está listo!</h1>
    <p>Hola, ${savedUser.name}:</p>
    <p>Para completar la configuración de tu cuenta y comenzar a disfrutar de los beneficios de nuestra aplicación, necesitamos confirmar que tenemos tu dirección de correo electrónico correcta.</p>
     <a href="${PAGE_URL}/verify/${savedUser.id}/${token}" class="button">Verificar correo electrónico</a>
    <p class="footer">Si tienes alguna pregunta o necesitas asistencia, no dudes en ponerte en contacto con nosotros.</p>
    
    
</div>
</body>
</html>
        `, // html body
      });

      return response.status(201).json('Usuario creado por favor verifica tu correo'); 
    
});

usersRouter.patch('/:id/:token', async (request, response) => {
    try {
      const token = request.params.token;
      const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      const id = decodedToken.id;
      await User.findByIdAndUpdate(id, { verified: true });
      return response.sendStatus(200);
    } catch (error) {
      //Encontrar el email del usuario
      const id = request.params.id;
      const { email } = await User.findById
  
        //Firmar nuevo token
        const token = jwt.sign({ id: id }, process.env.ACCESS_TOKEN_SECRET, {
          expiresIn: '1d',
        }); 
      
        //Enviar correo
      const transporter = nodemailer.createTransport({
          host: 'smtp.gmail.com',
          port: 465,
          secure: true, // Use `true` for port 465, `false` for all other ports
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          },
        });
  
        await transporter.sendMail({
          from: process.env.EMAIL_USER, // sender address
          to: email, // list of receivers
          subject: "Verificación de Usuario ✔", // Subject line
          html: `<a href="${PAGE_URL}/verify/${id}/${token}">Verificar Correo</a>`, // html body
        });
    
      return response.status(400).json({ error: 'El link ya expiró. Un nuevo link ha sido enviado' });
    }
  });


  usersRouter.get('/logged', userExtractor ,async (request, response) => {

    try {
        return response.status(200).json(request.user);
        
      } catch (error) {
        // Handle errors gracefully
        console.error(error);
        return response.status(500).json({ message: 'Error al recuperar usuarios' });
      }
   
  });


module.exports = usersRouter;  