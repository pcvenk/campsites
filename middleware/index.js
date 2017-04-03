var Campground = require('../models/campground');
var Comment = require('../models/comment');

var middlewareObj = {};

middlewareObj.campgroundOwnershipCheck = function(req, res, next){
    //is the user logged in
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, function(err, foundCampground){
            if(err){
                res.redirect('back');
            } else {
                //does the user own the campground
                if(foundCampground.author.id.toString() == req.user._id){
                    // if(foundCampground.author.id.equals(req.user._id)){
                    next();
                } else {
                    res.redirect('back');
                }
            }
        });
    } else {
        res.redirect('back');
    }
};

middlewareObj.commentOwnershipCheck = function(req, res, next){
    //is the user logged in
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err){
                req.flash('error', 'Campground not found!');
                res.redirect('back');
            } else {
                //does the user own the comment
                if(foundComment.author.id.toString() == req.user._id){
                    // if(foundComment.author.id.equals(req.user._id)){
                    next();
                } else {
                    req.flash('error', 'You are not authorised to add comments!');
                    res.redirect('back');
                }
            }
        });
    } else {
        req.flash('error', 'You need to login first!');
        res.redirect('back');
    }
};

middlewareObj.isLoggedIn = function(req, res, next){
    //if(req.user())
    if(req.isAuthenticated()){
        return next();
    } else {
        req.flash('error', 'You need to login in first!');
        res.redirect('/login');
    }

};

module.exports = middlewareObj;