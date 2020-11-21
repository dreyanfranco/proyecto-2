const express = require("express");
const router = express.Router();
// const passport = require("passport");
// const bcrypt = require("bcrypt");
// const bcryptSalt = 10;

//model
router.get("/profile", (req,res)=>res.render('profile'))

router.get("/signup", (req, res) => res.render("auth/signup"));

router.get("/login", (req, res) => res.render("auth/login"));

module.exports = router