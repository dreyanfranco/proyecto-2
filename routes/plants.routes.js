const express = require('express');
const router = express.Router();
const Plant = require('../models/plants.model');
const CDNupload = require('./../configs/cdn-upload.config')

const ensureAuthenticated = (req, res, next) => req.isAuthenticated() ? next() : res.render('auth/login', { errorMsg: 'Desautorizado, inicia sesión' });
const checkRole = admittedRoles => (req, res, next) => admittedRoles.includes(req.user.role) ? next() : res.render('auth/login', { errorMsg: 'Desautorizado, no tienes permisos' });

//Listado de plantas
router.get('/', (req, res, next) => { 
    
    Plant.find()
        .then(allThePlants => {
            if (req.user) {
                res.render('plants/all-plants', { plants: allThePlants, isAdmin: req.user.role.includes('ADMIN') })
            } else {
                res.render('plants/all-plants', { plants: allThePlants, isAdmin: false })
            }
        })
        .catch(err => next(new Error(err)))
})

//Crear planta
router.get('/crear-planta', (req, res, next) => { 
    Plant.find()
    .then(allThePlants => res.render('plants/new-plant', { plants: allThePlants}))
    .catch(err => next(new Error(err)))
})
router.post('/crear-planta', CDNupload.single('imageUrl'), (req, res, next) => {
    
    const imageUrl= req.file.path
    const { name, scientificName , description, climate, heigth, water, spray, care, ligth, location, petFriendly} = req.body

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
  
// Editar planta
router.get('/editar-planta', (req, res, next) => {
    const plantId = req.query.id

    Plant
        .findById(plantId)
        .then(thePlant => res.render('plants/edit-plant', thePlant))
        .catch(error => next(new Error(error)))
})

router.post('/editar-planta', CDNupload.single('imageUrl'),(req, res, next) => {
    const plantId = req.query.id
    let imageUrl
    if(req.file){
    imageUrl= req.file.path
    }
    console.log(req.body)
    const petFriendly = (req.body.petFriendly === "on") ?  true : false
    const { name, scientificName , description, climate, heigth, water, spray, care, ligth, location} = req.body

    Plant
        .findByIdAndUpdate(plantId, { name, scientificName, imageUrl, description, climate, heigth, water, spray, care, ligth, location, petFriendly }, { new: true })
        .then(() => res.redirect('/plantas'))
        .catch(error => next(new Error(error)))
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
