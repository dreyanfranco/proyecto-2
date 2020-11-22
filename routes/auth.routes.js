const express = require("express");
const router = express.Router();
const passport = require("passport");
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

const User = require('../models/user.model');

//Registro
router.get("/registro", (req, res) => res.render("auth/signup"));
router.post("/registro", (req, res, next) => {

    const { name,username, password, role } = req.body

    if (username === "" || password === "") {
        res.render("auth/signup", { errorMsg: "Fill the fields" })
        return
    }

    User
        .findOne({ username })
        .then(user => {
            if (user) {
                res.render("auth/signup", { errorMsg: "this user already exists" })
                return
            }

            // Otras validaciones
            const salt = bcrypt.genSaltSync(bcryptSalt)
            const hashPass = bcrypt.hashSync(password, salt)

            User.create({ name,username, password: hashPass, role})
                .then(() => res.redirect('/plantas'))
                .catch(() => res.render("auth/signup", { errorMsg: "Error" }))
        })
        .catch(error => next(error))
})
//Iniciar Sesión
router.get("/iniciar-sesion", (req, res) => res.render("auth/login", { errorMsg: req.flash("error") }))
router.post("/iniciar-sesion", passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/iniciar-sesion",
    failureFlash: true,
    passReqToCallback: true
}))
//Cerrar Sesión
router.get('/cerrar-sesion', (req, res) => {
    req.logout()
    res.redirect("/iniciar-sesion")
})

module.exports = router