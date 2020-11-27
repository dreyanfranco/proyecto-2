const express = require('express')
const router = express.Router()
const Plant = require('../models/plants.model');


// Endpoints
router.get('/', (req, res, next) => {
    Plant
        .find({ care: 'Casi inmortal' }, 'imageUrl name')
        .then(somePlants => res.render('index', {plants: somePlants}))
        .catch(err => next(new Error(err)))
})



module.exports = router
