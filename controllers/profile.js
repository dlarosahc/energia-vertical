const profileRouter = require('express').Router();

const User = require('../models/users');

profileRouter.get('/', async (request, response) => {
    const user = request.user;
    const profile = await User.findOne({ _id: request.user.id }).populate({
        path: 'payments',
        // populate: {path: 'package'}
    });
    return response.status(200).json(profile);
   
 });

module.exports = profileRouter;

//ATENCIÓN CORREGIR EL POPULATE DE PACKAGE PARA QUE SE VEA CUAL ES EL PAQUETE ACTUAL COMPRADO