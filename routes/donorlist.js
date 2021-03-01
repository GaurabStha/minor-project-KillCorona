var express = require('express');
var router = express.Router();
var donor = require('../models/donor');

/* GET donor registration page. */
router.get('/donorlist', (req, res) => {
    donor.find((err, docs) => {
        if (!err) {
            res.render('donorlist', {
                list: docs
            });
        }
        console.log(docs)
    })

});

module.exports = router;