const express = require('express');
const router = express.Router();
const Store = require('../models/store.model');

const ensureAuthenticated = (req, res, next) => req.isAuthenticated() ? next() : res.render('auth/login', { errorMsg: 'Desautorizado, inicia sesión' });
const checkRole = admittedRoles => (req, res, next) => admittedRoles.includes(req.user.role) ? next() : res.render('auth/login', { errorMsg: 'Desautorizado, no tienes permisos' });

// Listado de tiendas
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

// Crear tienda
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

//Editar tienda
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

// Eliminar tienda

router.get('/eliminar-tienda', ensureAuthenticated, checkRole(['ADMIN']), (req, res) => {
    const storeId = req.query.id

    Store
        .findByIdAndDelete(storeId)
        .then(res.redirect('/tiendas/'))
        .catch(error => next(new Error(error)))
})
module.exports = router