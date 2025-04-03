const classRouter = require('express').Router();
const Class = require('../models/class');
const Schedule = require('../models/schedule');
const User = require('../models/users');

classRouter.get('/', async (request, response) => {

  try {
      //Find all packages using Package.find()
      
     
     
      const classes = await Class.find().populate('user');
      
    
  
      //Check if any packages were found
      if (!classes.length) {
        return response.status(204).json({ message: 'No se encontraron clases' });
      }
  
      //Send the array of packages in the response
      return response.status(200).json(classes);
      
    } catch (error) {
      //Handle errors gracefully
      console.error(error);
      return response.status(500).json({ message: 'Error al recuperar clases' });
    }
 
});

classRouter.get('/two', async (request, response) => {

  try {
      // Find all packages using Package.find()
      const classes = request.user.rol === 'admin' 
      ? await Class.find().populate({
        path: 'user',
        populate: {path: 'payments'}
      }).populate('schedule')
      : await Class.find({ user: request.user.id }).populate({
        path: 'user',
        populate: {path: 'payments'}
      }).populate('schedule')
      
    
  
      // Check if any packages were found
      if (!classes.length) {
        return response.status(204).json({ message: 'No se encontraron clases' });
      }
  
      // Send the array of packages in the response
      return response.status(200).json(classes);
      
    } catch (error) {
      // Handle errors gracefully
      console.error(error);
      return response.status(500).json({ message: 'Error al recuperar clases' });
    }
 
});


classRouter.post('/', async (request, response) => {
    const user = request.user;
    
    const { date, schedule, payment } = request.body; 
    if (!date || !schedule || !payment ){
      return response.status(400).json({ error: 'Todos los datos son requeridos' });
  } 
   
    const newClass = new Class ({
       date,
       schedule,
       user,
       payment,
       
    });
   
    
    const savedClass = await newClass.save();
    user.class = user.class.concat(savedClass._id);
    await user.save();
   
    return response.status(201).json('Su clase ha sido agendada');
   });

   

classRouter.delete('/:id', async (request, response) => {
    try {
      //const user = request.user;
      const classId = request.params.id;
      console.log(classId);
      
      const classSelected = await Class.findById(classId).populate('user');
      console.log(classSelected);
      
      if(!classSelected){
        return response.status(404).json({ error: 'No se encontraron clases' })
      }
      const userId = classSelected.user._id; // ID del pago con que se reserva la clase
  
      // Eliminar el pago
      await Class.findByIdAndDelete(classId);
  
      // Actualizar al usuario
      const user = await User.findById(userId);
      user.class = user.class.filter(classes => classes.toString() !== classSelected.id.toString());
      await user.save();
      return response.sendStatus(204);
     
    } catch (error) {
      return response.status(500).json({ error: 'Error eliminando clase' })
    }
    
    
    
    
    
    
    
     });   



classRouter.patch("/:id/attended", async (request, response) => {
    
    
    const { attended } = request.body;
    
    await Class.findByIdAndUpdate(request.params.id, { attended });
    
    return response.sendStatus(200);
  });

  classRouter.patch("/:id/loaded", async (request, response) => {
    
    
    const { loaded } = request.body;
    
    await Class.findByIdAndUpdate(request.params.id, { loaded });
    
    return response.sendStatus(200);
  });
    

module.exports = classRouter;