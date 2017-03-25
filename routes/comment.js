var express = require('express');
var router = express.Router();
var Campground = require('../models/campground');
var Comment = require('../models/comment');

router.get('/campsites/:id/comments/new', isLoggedIn, function(req, res){
    //grab the campsite by id
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            res.send(err);
        } else {
            res.render('comments/new', {
                campground: campground
            });
        }
    });

});

//Comments Create route
router.post('/campsites/:id/comments', isLoggedIn, function(req, res){
    //find the campground by its id
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            res.send(err);
        } else {
            //create the comment
            var comment = {
                author: req.body.author,
                text: req.body.text
            };
            Comment.create(comment, function(err, comment){
                if(err){
                    res.send(err);
                } else {
                    //assosicate comment with campground
                    campground.comments.push(comment);
                    campground.save();
                    //redirect
                    res.redirect('/campsites/'+campground._id);
                }
            })
        }
    })
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