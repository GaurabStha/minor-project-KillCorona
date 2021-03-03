var express = require('express');
var router = express.Router();
var request = require('../models/request');

// Get Notification Page
router.get('/requestdonor', function(req, res) {
    res.render('requestDonor');
});

// POST the donor data to the database
router.post('/requestdonor', (req, res, next) => {
    const { username, address, phone, amount, bloodGroup } = req.body;
    if (!username || !address || !phone || !amount || !bloodGroup) {
        req.flash('error', 'All fields are required.');
        return res.redirect('/requestDonor');
    }

    const requestDonor = new request({
        username: username,
        address: address,
        phone: phone,
        amount: amount,
        bloodGroup: bloodGroup
    });

    requestDonor.save()
        .then((requestDonor) => {
            return res.redirect('/donorlist');
            console.log(requestDonor);
        }).catch((err) => {
            req.flash('error', 'Something went wrong.');
            return res.redirect('/requestDonor');
        })
})

module.exports = router;