const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {    res.send('fksdjfkjdslf');})
router.get('/detalle/:plantas_id', (req, res) => {    res.send('fsdhfdshf');})
module.exports = router