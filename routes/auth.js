var express = require('express');
var router  = express.Router();
var passport = require('passport');
var User = require('../models/user');


router.get('/register', function(req, res){
    res.render('register');
});

router.post('/register', function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            //todo fix the error flashing on err
            req.flash('error', err.message);
            return res.render('register');
        }
        passport.authenticate('local')(req, res, function() {
            req.flash('success', 'Welcome, '+user.username);
            res.redirect('/campsites');
        });
    });
});

router.get('/login', function(req, res){
    req.flash('error', 'You need to login first');
    res.render('login');
});

router.post('/login', passport.authenticate('local', {
    successRedirect: '/campsites',
    failureRedirect: '/login'
}), function(req, res){
    // res.redirect('/campsites');
});

router.get('/logout', function(req, res){
    req.logout();
    req.flash('success', 'You have successfully logged out');
    res.redirect('/campsites');
});

module.exports = router;