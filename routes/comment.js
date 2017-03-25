var express = require('express');
//passing IDs in the URL
var router = express.Router({mergeParams: true});
var Campground = require('../models/campground');
var Comment = require('../models/comment');

router.get('/new', isLoggedIn, function(req, res){
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
router.post('/', isLoggedIn, function(req, res){
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
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    console.log(comment);
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