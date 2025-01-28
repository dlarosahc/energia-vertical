const packagesRouter = require('express').Router();
const Package = require('../models/packages');


packagesRouter.post('/', async (request, response) => {
    const { name, description, price, classQuantity } = request.body;
    
    if (!name || !description || !price || !classQuantity ){
        return response.status(400).json({ error: 'Todos los datos son requeridos' });
    }

    const newPackage = new Package({
        name,
        description,
        price,
        classQuantity,
        });

    const savedPackage = await newPackage.save();
    
    return response.status(201).json(`${savedPackage.name} creado con éxito`); 
   
});

packagesRouter.get('/', async (request, response) => {

    try {
        // Find all packages using Package.find()
        const packages = await Package.find();
    
        // Check if any packages were found
        if (!packages.length) {
          return response.status(204).json({ message: 'No se encontraron paquetes' });
        }
    
        // Send the array of packages in the response
        return response.status(200).json(packages);
        
      } catch (error) {
        // Handle errors gracefully
        console.error(error);
        return response.status(500).json({ message: 'Error al recuperar paquetes' });
      }
   
});

packagesRouter.delete('/:id', async (request, response) => {
  
  await Package.findByIdAndDelete(request.params.id);

  return response.sendStatus(204);
 
});

packagesRouter.patch('/:id', async (request, response) => {
  
  const { updateData } = request.body;

  try {
    const updatedPackage = await Package.findByIdAndUpdate(
      request.params.id,
      updateData,
      { new: true } // Retorna el documento actualizado
    );

    if (!updatedPackage) {
      return response.status(404).json({ message: 'Paquete no encontrado' });
    }

    return response.status(200).json(updatedPackage);
  } catch (error) {
    console.error(error);
    return response.status(500).json({ message: 'Error al actualizar el paquete' });
  }
 
});




module.exports = packagesRouter;