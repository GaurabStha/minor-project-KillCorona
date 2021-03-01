var express = require('express');
var router = express.Router();

/* GET tracker page. */
router.get('/tracker', function(req, res, next) {
    res.render('tracker');
});

module.exports = router;