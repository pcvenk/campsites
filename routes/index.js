var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    res.render('home');
});


//404 response
router.use(function (req, res, next) {
    // res.status(404).send("Sorry can't find that!")
    res.render('404');
});

module.exports = router;