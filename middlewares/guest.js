function guest(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/');

    }
    return next();
}

module.exports = guest;