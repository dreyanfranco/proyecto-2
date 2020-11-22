const express = require('express')
const router = express.Router()
const Store = require('../models/store.model');

// Endpoints
router.get('/tiendas', (req, res) => {
    Store
        .find()
        .then(places => res.json(places))
        .catch(err => next(err))
})

module.exports = router