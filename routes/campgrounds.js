var express = require('express');
var router  = express.Router();
var Campground = require('../models/campground');

//INDEX - show all campsites
router.get('/', function (req, res) {
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        } else {
            res.render('campgrounds/index', {
                campgrounds: allCampgrounds
            });
        }
    });
});

//CREATE - create a new campground
router.post('/', isLoggedIn, function (req, res) {
    //grabbing form data
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;

    var newCampsite = {
        name: name,
        image: image,
        description: description
    };
    //creating a new site and saving it to DB
    Campground.create(newCampsite, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            res.redirect('/campsites');
        }
    });
});

//NEW - display a form for adding new camgrounds
router.get('/new', isLoggedIn, function (req, res) {
    res.render('campgrounds/new');
});

//SHOW - info about the particular site
router.get('/:id', function(req, res){

    // Campground.findById(req.params.id, function(err, selectedSite){
    //     if(err){
    //         console.log(err);
    //     } else {
    //         res.render('show', {
    //             campground: selectedSite
    //         });
    //     }
    // });

    Campground.findOne({_id: req.params.id})
        .populate('comments')
        .exec(function(err, selectedSite){
            if(err){
                console.log(err);
            } else {
                console.log(selectedSite);
                res.render('campgrounds/show', {
                    campground: selectedSite
                });
            }
        });
});

//User login middleware
function isLoggedIn(req, res, next){
    //if(req.user())
    if(req.isAuthenticated()){
        return next();
    } else {
        res.redirect('/login');
    }

}

module.exports = router;