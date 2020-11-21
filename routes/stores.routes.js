const express = require('express');
const router = express.Router();
//model

router.get('/', (req, res) => { res.render('stores/all-stores') })

module.exports = router