const express = require('express')
const router = express.Router()


// Endpoints
router.get('/', (req, res) => res.render('index'))

// router.get('/perfil', ensureAuthenticated, checkRole(['ADMIN', 'USER']), (req, res) => res.render('profile', { user: req.user, isAdmin: req.user.role.includes('ADMIN') }))

module.exports = router
