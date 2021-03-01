var express = require('express');
var router = express.Router();

/* GET plasma donation list page. */
router.get('/plasmabank', function(req, res, next) {
    res.render('plasmabank');
});

module.exports = router;