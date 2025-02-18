const coachesRouter = require('express').Router();
const Coach = require('../models/coaches');


coachesRouter.post('/', async (request, response) => {
    const { name } = request.body;
    
    const newCoach = new Coach({
        name,
        
        });

    const savedCoach = await newCoach.save();
    
    return response.status(201).json(`Instructor agregado con éxito`); 
   
});

coachesRouter.get('/', async (request, response) => {

    try {
        // Find all packages using Package.find()
        const coaches = await Coach.find();
    
        // Check if any packages were found
        if (!coaches.length) {
          return response.status(204).json({ message: 'No se encontraron instructores' });
        }
    
        // Send the array of packages in the response
        return response.status(200).json(coaches);
        
      } catch (error) {
        // Handle errors gracefully
        console.error(error);
        return response.status(500).json({ message: 'Error al recuperar instructores' });
      }
   
});






module.exports = coachesRouter;