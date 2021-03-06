const express = require("express");
const router = express.Router();
const passport = require("passport");
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

const ensureAuthenticated = (req, res, next) => req.isAuthenticated() ? next() : res.render('auth/login', { errorMsg: 'Desautorizado, inicia sesión' });
const checkRole = admittedRoles => (req, res, next) => admittedRoles.includes(req.user.role) ? next() : res.render('auth/login', { errorMsg: 'Desautorizado, no tienes permisos' });

const User = require('../models/user.model');

// Edit profile
router.get('/editar-perfil', (req, res, next) => {
    const userId = req.query.id
    User
        .findById(userId)
        .then(theUser => res.render('edit-profile', theUser))
        .catch(error => next(new Error(error)))
})
router.post('/editar-perfil', (req, res, next) => {
    const userId = req.query.id
    const { name, username, password } = req.body
    User
        .findByIdAndUpdate(userId, { name, username, password }, { new: true })
        .then(() => res.redirect('/perfil'))
        .catch(error => next(new Error(error)))
})

// Delete profile
router.get('/eliminar-perfil', (req, res, next) => {
    const userId = req.query.id
    User
        .findByIdAndDelete(userId)
        .then(res.redirect('/'))
        .catch(error => next(new Error(error)))
})

// Profile
router.get('/perfil', ensureAuthenticated, checkRole(['ADMIN', 'USER']), (req, res, next) => {
    User
        .findById(req.user._id)
        .populate('plants')
        .then((theUser) => {
            res.render('profile', { user: theUser, isAdmin: req.user.role.includes('ADMIN') })
        })
        .catch(err => next(new Error(err)))
})

// Add plant to profile
router.get('/perfil/agregar-planta/:plant_id', ensureAuthenticated, (req, res, next) => {
    User
    .findById(req.user._id)
    .then((theUser) => {
        if (theUser.plants.includes(req.params.plant_id)) {
            res.redirect('/perfil')
        }
        else {
            return User.findByIdAndUpdate(req.user._id, { $push: { plants: req.params.plant_id } }, { new: true })
            .then(() => res.redirect('/perfil'))
        }
    })
    .catch(err => next(new Error(err)))
})

// Remove plant from profile
router.get('/perfil/quitar-planta/:plant_id', (req, res, next) => {
    User
        .findByIdAndUpdate(req.user._id, { $pull: { plants: req.params.plant_id } }, { new: true })
        .then(() => res.redirect('/perfil'))
        .catch(err => next(new Error(err)))
})

// Signup
router.get("/registro", (req, res) => res.render("auth/signup"));

router.post("/registro", (req, res, next) => {
    const { name, username, password, role } = req.body
    if (username === "" || password === "") {
        res.render("auth/signup", {
            errorMsg: "Llena todos los campos"
        })
        return
    }
    if (password.length < 6 || !password.match(/[A-Z][a-z]/) || !password.match(/[0-9]/)) {
        res.render("auth/signup", {
            errorMsg: "Incluye una mayúscula y un número en tu contraseña."
        })
        return
    }
    User
        .findOne({ username })
        .then(user => {
            if (user) {
                res.render("auth/signup", { errorMsg: "this user already exists" })
                return
            }
            const salt = bcrypt.genSaltSync(bcryptSalt)
            const hashPass = bcrypt.hashSync(password, salt)

            User.create({ name, username, password: hashPass, role })
                .then(() => res.redirect('/plantas'))
                .catch(() => res.render("auth/signup", { errorMsg: "Error" }))
        })
        .catch(error => next(error))
})

// Login
router.get("/iniciar-sesion", (req, res) => res.render("auth/login", { errorMsg: req.flash("error") }))

router.post("/iniciar-sesion", passport.authenticate("local", {
    successRedirect: "/perfil",
    failureRedirect: "/iniciar-sesion",
    failureFlash: true,
    passReqToCallback: true
}))

// Logout
router.get('/cerrar-sesion', (req, res) => {
    req.logout()
    res.redirect("/iniciar-sesion")
})

module.exports = router