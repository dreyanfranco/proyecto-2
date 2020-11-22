const express = require('express');
const router = express.Router();
const Plant = require('../models/plants.model');
//Listado de plantas
router.get('/', (req, res, next) => { 
    Plant.find()
    .then(allThePlants => res.render('plants/all-plants', { plants: allThePlants}))
    .catch(err => next(new Error(err)))
})

//Crear planta
router.get('/crear-planta', (req, res, next) => { 
    Plant.find()
    .then(allThePlants => res.render('plants/new-plant', { plants: allThePlants}))
    .catch(err => next(new Error(err)))
})
// Detalles de planta
router.get('/detalle/:plant_id', (req, res) => {

    const plantId = req.params.plant_id

    Plant
        .findById(plantId)
        
        .then(thePlant => res.render('plants/plant-details', thePlant))
        .catch(err => console.log(err))
})
module.exports = router
