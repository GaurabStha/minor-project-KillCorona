var express = require('express');
var router = express.Router();
var donor = require('../models/donor');

/* GET donor registration page. */
router.get('/about', (req, res) => {
    res.render('about');
});

module.exports = router;