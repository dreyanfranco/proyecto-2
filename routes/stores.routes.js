const express = require('express');
const router = express.Router();
const Store = require('../models/store.model');

// router.get('/', (req, res, next) => { 
//     Store
//     .find()
//     .then(allTheStores => res.render('plants/all-stores', { store: allTheStores}))
//     .catch(err => next(new Error(err)))
// })

module.exports = router