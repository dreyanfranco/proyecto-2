const express = require('express')
const router = express.Router()
const Store = require('../models/store.model');

// Endpoints
router.get('/tiendas', (req, res) => {
    Store
        .find()
        .then(allStores => res.json(allStores))
        .catch(err => next(err))
})

// mapa detalle tienda
router.get('tiendas/detalle/:store_id', (req, res) => {
    const storeId = req.params.store_id
    Store
        .findById(storeId)
        .then(store => res.json(store))
        .catch(err => next(err))
})

module.exports = router