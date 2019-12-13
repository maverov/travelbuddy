const express = require("express");
const router = express.Router();
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("../models/user");
const flash = require("connect-flash");

router.use(flash());

// Middleware
const isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash("success", "Please Login first!");
    res.redirect("/login");
}

// Root route
router.get("/", (req, res) => {
    res.render("landing")
});

router.get("/about", (req, res) => {
    res.render("about");
})

// Show register form (Authentication)
router.get("/register", (req, res) => {
    res.render("register");
});

// Handle sign up logic (Authentication)
router.post("/register", (req, res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        age: req.body.age
    });
    User.register(newUser, req.body.password, (err, user) => {
        if (err) {
            res.redirect("/register");
        }

        passport.authenticate("local")(req, res, () => {
            res.redirect("/trips");
        });
    });
});

// Show login form (Authentication)
router.get("/login", (req, res) => {
    res.render("login", { message: req.flash("error") });
});

// Handle login logic (Authentication)
router.post("/login", passport.authenticate("local",
    {
        successRedirect: "/trips",
        failureRedirect: "/login"
    }), (req, res) => {
    });

// logout (Authentication)
router.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/trips");
});

module.exports = router;