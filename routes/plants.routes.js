const express = require('express');
const router = express.Router();
//model

router.get('/', (req, res) => { res.render('plants/all-plants') })

// router.get('/detalle/:plantas_id', (req, res) => { res.send('fsdhfdshf') })


module.exports = router
