const express = require('express');
const router = express.Router();
const Store = require('../models/store.model');
const Plant = require('../models/plants.model');

const ensureAuthenticated = (req, res, next) => req.isAuthenticated() ? next() : res.render('auth/login', { errorMsg: 'Desautorizado, inicia sesión' });
const checkRole = admittedRoles => (req, res, next) => admittedRoles.includes(req.user.role) ? next() : res.render('auth/login', { errorMsg: 'Desautorizado, no tienes permisos' });

// Stores list
router.get('/', (req, res, next) => {

    Store
        .find()
        .then(allTheStores => {
            if (req.user) {
                res.render('stores/all-stores', { stores: allTheStores, isAdmin: req.user.role.includes('ADMIN') })
            } else {
                res.render('stores/all-stores', { stores: allTheStores, isAdmin: false })
            }
        })
        .catch(err => next(new Error(err)))
})

// Create store
router.get('/crear-tienda', ensureAuthenticated, checkRole(['ADMIN']), (req, res) => res.render('stores/new-store'));

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

// Store detail
router.get('/detalle/:store_id', (req, res, next) => {
    const storeId = req.params.store_id

    Store
        .findById(storeId)
        .populate('plants')
        .then(theStore => res.render('stores/store-details', { store: theStore, isAdmin: req.user.role.includes('ADMIN')}))
        .catch(err => next(new Error(err)))
})

// Store plant catalog
router.get('/catalogo/:store_id', ensureAuthenticated, checkRole(['ADMIN']), (req, res, next) => {
    const storeId = req.params.store_id

    Plant
        .find()
        .then(allThePlants => res.render('stores/list-plants', { plants: allThePlants, isAdmin: req.user.role.includes('ADMIN'), storeId }))
        .catch(err => next(new Error(err)))
})

// Add plant to store
router.get('/agregar-planta/:store_id/:plant_id', ensureAuthenticated, (req, res, next) => {

    Store
        .findById(req.params.store_id)
        .then((theStore) => {
            if (theStore.plants.includes(req.params.plant_id)) {
                res.redirect(`/tiendas/detalle/${req.params.store_id}`)
            }
            else {
                const storePromise = Store.findByIdAndUpdate(req.params.store_id, { $push: { plants: req.params.plant_id } }, { new: true })
                const plantPromise = Plant.findByIdAndUpdate(req.params.plant_id, { $push: { stores: req.params.store_id } }, { new: true })
                Promise.all([storePromise, plantPromise])

                    .then(() => res.redirect(`/tiendas/detalle/${req.params.store_id}`))
            }
        })

        .catch(err => next(new Error(err)))
})

// Edit store
router.get('/editar-tienda', ensureAuthenticated, checkRole(['ADMIN']), (req, res, next) => {
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

// Delete store

router.get('/eliminar-tienda', ensureAuthenticated, checkRole(['ADMIN']), (req, res) => {
    const storeId = req.query.id

    Store
        .findByIdAndDelete(storeId)
        .then(res.redirect('/tiendas/'))
        .catch(error => next(new Error(error)))
})
module.exports = router