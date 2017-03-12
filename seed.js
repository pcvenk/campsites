var mongoose = require('mongoose');
var Campground = require('./models/campground');

function seedsDB(){
    Campground.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log('removed all campgrounds');
    });
}

module.exports = seedsDB;