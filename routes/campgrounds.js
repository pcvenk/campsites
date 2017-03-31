var express = require('express');
var router  = express.Router();
var Campground = require('../models/campground');
var middleware = require('../middleware');

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
router.post('/', middleware.isLoggedIn, function (req, res) {
    //grabbing form data
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    };

    var newCampsite = {
        name: name,
        image: image,
        description: description,
        author: author
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
router.get('/new', middleware.isLoggedIn, function (req, res) {
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
                // console.log(selectedSite);
                res.render('campgrounds/show', {
                    campground: selectedSite
                });
            }
        });
});

//EDIT - display the edit campground form
router.get('/:id/edit', middleware.campgroundOwnershipCheck,function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            console.log(err);
            res.redirect('back');
        } else {
            res.render('campgrounds/edit', {foundCampground: foundCampground});
        }
    });
});

//UPDATE - post route
router.put('/:id/update', middleware.campgroundOwnershipCheck, function(req, res){
    var updatedCampground = {
        name: req.body.name,
        image: req.body.image,
        description: req.body.description
    };
    Campground.findByIdAndUpdate(req.params.id, updatedCampground, function(err, campground){
        if(err){
            console.log(err);
        } else {
            res.redirect('/campsites/'+campground._id)
        }
    });
});

//DESTROY - delete a campgraound
router.delete('/:id', middleware.campgroundOwnershipCheck, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
            console.log(err);
            res.redirect('/campsites');
        } else {
            res.redirect('/campsites');
        }
    });
});

module.exports = router;