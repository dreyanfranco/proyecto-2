const express = require('express');
const router = express.Router();
const Store = require('../models/store.model');

// Listado de tiendas
router.get('/', (req, res, next) => {
    Store
        .find()
        .then(allTheStores => res.render('stores/all-stores', { stores: allTheStores }))
        .catch(err => next(new Error(err)))
})

// Crear tienda
router.get('/crear-tienda', (req, res) => res.render('stores/new-store'));

router.post('/crear-tienda', (req, res, next) => {
    const { name, direction, latitude, longitude } = req.body

    const location = {
        type: 'Point',
        coordinates: [latitude, longitude]
    }

    Store
        .create({ name, direction, location })
        .then(() => res.redirect('/tiendas'))
        .catch(err => next(new Error(err)))
})

// Detalles tienda
// router.get('/detalle/:store_id', (req, res) => {

//     const storeId = req.params.store_id

//     Store
//         .findById(storeId)
//         .then(thePlant => res.render('stores/store-details', thePlant))
//         .catch(err => console.log(err))
// })

//Editar tienda
router.get('/editar-tienda', (req, res, next) => {
    const storeId = req.query.id

    Store
        .findById(storeId)
        .then(theStore => res.render('stores/edit-store', theStore))
        .catch(error => next(new Error(error)))
})

router.post('/editar-tienda', (req, res, next) => {
    const storeId = req.query.id

    const { name, direction, latitude, longitude } = req.body

    const location = {
        type: 'Point',
        coordinates: [latitude, longitude]
    }

    Store
        .findByIdAndUpdate(storeId, { name, direction, location }, { new: true })
        .then(() => res.redirect('/tiendas'))
        .catch(error => next(new Error(error)))
})

// Eliminar tienda

router.get('/eliminar-tienda', (req, res) => {
    const storeId = req.query.id

    Store
        .findByIdAndDelete(storeId)
        .then(res.redirect('/tiendas/'))
        .catch(error => next(new Error(error)))
})
module.exports = router