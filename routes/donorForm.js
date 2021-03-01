var express = require('express');
var router = express.Router();
var donor = require('../models/donor');

/* GET donor registration page. */
router.get('/donorform', (req, res, next) => {
    res.render('donorForm');
});

// POST the donor data to the database
router.post('/donorform', (req, res, next) => {
    const { username, address, phone, bloodGroup, coronaCured } = req.body;
    if (!username || !address || !phone || !bloodGroup || !coronaCured) {
        req.flash('error', 'All fields are required.');
        return res.redirect('/donorForm');
    }

    const donorList = new donor({
        username: username,
        address: address,
        phone: phone,
        bloodGroup: bloodGroup,
        coronaCured: coronaCured
    });

    donorList.save()
        .then((donorList) => {
            return res.redirect('/donorlist');
        }).catch((err) => {
            req.flash('error', 'Something went wrong.');
            return res.redirect('/donorForm');
        })
    console.log(req.body);
})

module.exports = router;