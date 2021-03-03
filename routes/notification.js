var express = require('express');
var router = express.Router();

// Get Notification Page
router.get('/notification', function(req, res) {
    res.render('notification');
});

module.exports = router;