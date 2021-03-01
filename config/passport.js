const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const bcrypt = require('bcrypt');

function init(passport) {
    passport.use(new LocalStrategy({ usernameField: 'username' }, async(username, password, done) => {
        // Login

        // Check if username exists
        const user = await User.findOne({ username: username });
        if (!user) {
            return done(null, false, { message: 'No user with this username.' });
        };

        bcrypt.compare(password, user.password)
            .then(match => {
                if (match) {
                    return done(null, user, { message: 'Logged in successfully.' });
                }
                return done(null, false, { message: 'Worng username or password.' });
            }).catch(err => {
                return done(null, false, { message: 'Something went wrong.' });
            })
    }));

    passport.serializeUser(function(user, done) {
        done(null, user._id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });
};

module.exports = init;