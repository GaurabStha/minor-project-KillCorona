var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');
const passport = require('passport');
const guest = require('../middlewares/guest');

/* GET login page. */
router.get('/login', function(req, res, next) {
    res.render('login');
}, guest);

/* GET register page. */
router.get('/register', function(req, res) {
    res.render('register');
}, guest);

// POST register data
router.post('/register', async function(req, res, next) {
    const { username, email, password, confirmpassword } = req.body;

    if (!username || !email || !password || !confirmpassword) {
        req.flash('error', 'All fields are required.');
        req.flash('username', username);
        req.flash('email', email);
        return res.redirect('/register');
    };

    // Check if email exists
    User.exists({ username }, (err, result) => {
        if (result) {
            req.flash('error', 'Username already exists.');
            req.flash('username', username);
            req.flash('email', email);
            return res.redirect('/register');
        }
    });

    // Check if email exists
    User.exists({ email: email }, (err, result) => {
        if (result) {
            req.flash('error', 'Email already exists.');
            req.flash('username', username);
            req.flash('email', email);
            return res.redirect('/register');
        }
    });

    // If password and confirmpassword are not same
    if (password !== confirmpassword) {
        req.flash('error', 'Passwords are not same.');
        req.flash('username', username);
        req.flash('email', email);
        return res.redirect('/register');
    };

    // Hash password
    const hashPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = new User({
        username: username,
        email: email,
        password: hashPassword,
        confirmpassword: hashPassword
    });

    user.save()
        .then((user) => {
            return res.redirect('/');
        }).catch((err) => {
            req.flash('error', 'Something went wrong.');
            return res.redirect('/register');
        })
});

router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            req.flash('error', info.message);
            return next(err);
        };
        if (!user) {
            req.flash('error', info.message);
            return res.redirect('/login');
        };
        req.logIn(user, (err) => {
            if (err) {
                req.flash('error', info.message);
                return next(err);
            };
            return res.redirect('/');
        })
    })(req, res, next);
});

router.post('/logout', (req, res) => {
    req.logOut();
    return res.redirect('/login');
})

module.exports = router;