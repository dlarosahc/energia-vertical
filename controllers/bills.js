const billsRouter = require('express').Router();
const Bill = require('../models/bills');
const Coach = require('../models/coaches');


billsRouter.post('/', async (request, response) => {
    
   try {
    const { date, coach } = request.body; 
    if (!date || !coach ){
      return response.status(400).json({ error: 'Todos los datos son requeridos' });
  } 
   
    const newBill = new Bill ({
       date,
       coach,
       
       
    });
   
    
    const savedBill = await newBill.save();
    const coachToUpdate = await Coach.findById(coach);
    coachToUpdate.bills = coachToUpdate.bills.concat(savedBill._id)
    await coachToUpdate.save();
   
    return response.status(201).json('Clase Registrada con éxito');
   } catch (error) {
    console.log(error);
    
   }
   
   });

billsRouter.get('/', async (request, response) => {

    try {
        // Find all packages using Package.find()
        const bills = await Bill.find().populate('coach');
    
        // Check if any packages were found
        if (!bills.length) {
          return response.status(204).json({ message: 'No se encontraron clases' });
        }
    
        // Send the array of packages in the response
        return response.status(200).json(bills);
        
      } catch (error) {
        // Handle errors gracefully
        console.error(error);
        return response.status(500).json({ message: 'Error al recuperar clases' });
      }
   
});

billsRouter.patch("/:id/paid", async (request, response) => {
  const user = request.user;
  
  const { paid } = request.body;
  
  await Bill.findByIdAndUpdate(request.params.id, { paid });
  
 
  
  return response.sendStatus(200);
});




module.exports = billsRouter;