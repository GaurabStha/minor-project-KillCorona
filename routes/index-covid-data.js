var express = require('express');
var router = express.Router();
const novelCovid = require('novelcovid');

// you can choose which URL to use, this will not change the behaviour of the API
novelCovid.settings({
    baseUrl: 'https://disease.sh'
});

router.get('/', (req, res) => {
    // This prints the corona data of Nepal
    novelCovid.countries({ country: 'nepal' })
        .then((response) => {
            res.render('index', { info: response });
        })
});

module.exports = router;