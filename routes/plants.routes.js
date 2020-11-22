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
router.post('/crear-planta', (req, res, next) => {

    const { name, scientificName, imageUrl, description, climate, heigth, water, spray, care, ligth, location, petFriendly} = req.body

     Plant
        .create({ name, scientificName, imageUrl, description, climate, heigth, water, spray, care, ligth, location, petFriendly })
        .then(() => res.redirect('/plantas'))
        .catch(err => next(new Error(err)))
})
//Eliminar Planta
router.get('/eliminar', (req, res, next) => {
    Plant
      .findByIdAndDelete(req.query.id)
      .then(() => res.redirect('/plantas'))
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
