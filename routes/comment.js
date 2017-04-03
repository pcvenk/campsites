var express = require('express');
//passing IDs in the URL
var router = express.Router({mergeParams: true});
var Campground = require('../models/campground');
var Comment = require('../models/comment');
var middleware = require('../middleware');

//NEW comment
router.get('/new', middleware.isLoggedIn, function(req, res){
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

//CREATE comment
router.post('/', middleware.isLoggedIn, function(req, res){
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
                    req.flash('error', 'Something went wrong!');
                    res.send(err);
                } else {
                    //add username and id to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    console.log(comment);
                    //assosicate comment with campground
                    campground.comments.push(comment);
                    campground.save();
                    //redirect
                    req.flash('success', 'You have successfully created a new comment!');
                    res.redirect('/campsites/'+campground._id);
                }
            })
        }
    })
});

//EDIT comments route
router.get('/:comment_id/edit', middleware.commentOwnershipCheck, function(req, res){
    //id of the campground from the URL
    var campground_id = req.params.id;
    Comment.findById(req.params.comment_id, function(err, foundComment){
       if(err){
           console.log(err);
       } else {
           res.render('comments/edit', {
               comment: foundComment,
               campground_id: campground_id
           });
           // res.send("Edit comment route");
       }
    });
});

//UPDATE comments route
router.put('/:comment_id', middleware.commentOwnershipCheck, function(req, res){
    //todo fix the edit comment
    var updatedComment = req.body.text;
    Comment.findByIdAndUpdate(req.params.comment_id, updatedComment, function(err, updComment){
        if(err){
            res.redirect('back');
            console.log(err);
        } else {
            res.redirect('/campsites/'+req.params.id);
            console.log('SUCCESS');
            console.log(updComment);
        }
    });
});

//DELETE - Comment
router.delete('/:comment_id', middleware.commentOwnershipCheck, function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            console.log(err);
        } else {
            req.flash('success', 'Comment successfully deleted');
            res.redirect('back');
        }
    })
});

module.exports = router;