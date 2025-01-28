const paymentsRouter = require('express').Router();
const nodemailer = require('nodemailer');
const Payment = require('../models/payments');
const Package = require('../models/packages');
const User = require('../models/users');


paymentsRouter.get('/', async (request, response) => {

   try {
       // Find all packages using Package.find()
       const payments = request.user.rol === 'admin'
        ? await Payment.find().populate('user').populate('package')
        : await Payment.find({ user: request.user.id }).populate('user').populate('package').populate('classQuantity')
   
       // Check if any packages were found
       if (!payments.length) {
         return response.status(204).json({ message: 'No se encontraron pagos' });
       }
   
       // Send the array of packages in the response
       return response.status(200).json(payments);
       
     } catch (error) {
       // Handle errors gracefully
       console.error(error);
       return response.status(500).json({ message: 'Error al recuperar pagos' });
     }
  
});

paymentsRouter.post('/', async (request, response) => {
    const user = request.user;
    
    const { date, method, ref, amount, package, classQuantity } = request.body; 
    if (!date || !method || !ref || !amount ){
      return response.status(400).json({ error: 'Todos los datos son requeridos' });
  } 
   
    const newPayment = new Payment ({
       date,
       method,
       ref,
       amount,
       classQuantity,
       package,
       user,
    });
   
    const payingUser = await User.findById(user);
    const savedPayment = await newPayment.save();
    user.payments = user.payments.concat(savedPayment._id);
    await user.save();
    const payment = await Payment.findById(savedPayment._id).populate('user').populate('package');
    const userEmail = payment.user.email;
    


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
      to: "energiaverticalpole@gmail.com", // list of receivers
      subject: "Nuevo Pago recibido", // Subject line
      html: `<p>Nuevo pago recibido de ${user.name} fecha ${date} por el monto de ${payment?.method === 'pagomovil'? (`Bs.`):(`$`)} ${payment?.method === 'pagomovil'? (`Bs.`):(`$`)}  ${amount}</p>`, // html body
    });

    
    await transporter.sendMail({
      from: process.env.EMAIL_USER, // sender address
      to: userEmail , // list of receivers
      subject: "Pago pendiente por aprobación", // Subject line
      html: `
      <!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Pago pendiente por aprobacion</title>
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
    <h1 class="header">Pago Recibido</h1>
    <p>Hola, ${payment.user.name}:</p>
    <p>Te confirmamos que hemos recibido tu pago de ${payment?.method === 'pagomovil'? (`Bs.`):(`$`)}${payment.amount} correspondiente a la compra de un ${payment.package.name} </p>
    <p>Una vez hayamos verificado la transacción, procederemos a aprobar tu pago y te notificaremos por este medio.</p>
    <p class="footer">Si tienes alguna pregunta o necesitas asistencia, no dudes en ponerte en contacto con nosotros.</p>
    
</div>
</body>
</html>
      `, // html body
    });
    return response.status(201).json('Su compra está siendo procesada');
   });

paymentsRouter.delete('/:id', async (request, response) => {
  try {
    //const user = request.user;
    const paymentId = request.params.id;
    const payment = await Payment.findById(paymentId).populate('user');
    
    if(!payment){
      return response.status(404).json({ error: 'No se encontraron pagos' })
    }
    const userId = payment.user._id; // ID del usuario que realizó el pago

    // Eliminar el pago
    await Payment.findByIdAndDelete(paymentId);

    // Actualizar al usuario
    const user = await User.findById(userId);
    user.payments = user.payments.filter(payments => payments.toString() !== payment.id.toString());
    await user.save();
    return response.sendStatus(204);
   
  } catch (error) {
    return response.status(500).json({ error: 'Error eliminando el pago' })
  }
  
  
  
  
  
  
  
   });


paymentsRouter.patch("/:id/checked", async (request, response) => {
    const user = request.user;
    
    const { approved } = request.body;
    
    await Payment.findByIdAndUpdate(request.params.id, { approved });
    const payment =  await Payment.findById(request.params.id).populate('user').populate('package');
    const userEmail = payment.user.email;
    
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
      to: userEmail , // list of receivers
      subject: "Pago Aprobado ✓", // Subject line
      html: `
      <!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Pago Aprobado</title>
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
    
    <h1 class="header">Pago Aprobado</h1>
    <p>Hola, ${payment.user.name}:</p>
    <p>Te confirmamos que tu pago ha sido aprobado y tu ${payment.package.name} ya se encuentra activo</p>
    <p class="footer">Si tienes alguna pregunta o necesitas asistencia, no dudes en ponerte en contacto con nosotros.</p>
    
</div>
</body>
</html>
      `, // html body
    });
    
    return response.sendStatus(200);
  });

  paymentsRouter.patch("/:id/classQuantity", async (request, response) => {
   
    try {
      await Payment.findByIdAndUpdate(request.params.id, { $inc: { classQuantity: -1 } });
      return response.json({ message: 'Cantidad de clase actualizada exitosamente' });
  } catch (error) {
      console.error(error);
      return response.status(500).json({ error: 'Error al actualizar la cantidad de clases' });
  }
  });
module.exports = paymentsRouter;