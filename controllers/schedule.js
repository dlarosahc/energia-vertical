const scheduleRouter = require('express').Router();

const Schedule = require('../models/schedule');

scheduleRouter.post('/', async (request, response) => {
    const { dayOfWeek, time, discipline, coach } = request.body;
    
    if (!dayOfWeek || !time || !discipline | !coach  ){
        return response.status(400).json({ error: 'Todos los datos son requeridos' });
    }

    const newSchedule = new Schedule({
        dayOfWeek,
        time,
        discipline,
        coach,
        });

    const savedSchedule = await newSchedule.save();
    
    return response.status(201).json('Horario creado con éxito'); 
   
 });

 scheduleRouter.get('/', async (request, response) => {

    try {
        // Find all packages using Package.find()
        const schedule = await Schedule.find();
    
        // Check if any packages were found
        if (!schedule.length) {
          return response.status(204).json({ message: 'No se encontraron horarios' });
        }
    
        // Send the array of packages in the response
        return response.status(200).json(schedule);
        
      } catch (error) {
        // Handle errors gracefully
        console.error(error);
        return response.status(500).json({ message: 'Error al recuperar horarios' });
      }
   
});

module.exports = scheduleRouter;