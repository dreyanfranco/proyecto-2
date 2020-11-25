const express = require('express')
const router = express.Router()
const Plant = require('../models/plants.model');


// Endpoints
router.get('/', (req, res, next) => {
    
    Plant
        .find({ care: 'Casi inmortal' })
        .then(somePlants => res.render('index', {plants: somePlants}))
        .catch(error => console.log(error))
})



module.exports = router
