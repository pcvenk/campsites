var mongoose = require('mongoose');
var Campground = require('./models/campground');
var Comment = require('./models/comment');

var data = [
    {
        name: 'Camp Danica',
        image: 'http://www.photosforclass.com/download/3062178880',
        description: "A nice little spot on the verge of TNP"
    },
    {
        name: 'Camp Zlatorog',
        image: 'http://www.photosforclass.com/download/32317369293',
        description: "The most heartbreaking experience you will ever experience"
    },
    {
        name: 'Camp Bled',
        image: 'http://www.photosforclass.com/download/9586944536',
        description: "A great spot to visit for young families and adventures alike"
    },
    {
        name: 'Zelena Laguna',
        image: 'http://www.photosforclass.com/download/2617791137',
        description: "Relaxing site big enough to accommodate hundreds of wild enthusiaists"
    }
];

function seedsDB(){
    //Remove all campgrounds
    Campground.remove({}, function(err){
        if(err){
            console.log(err);
        } else {
            console.log('removed all campgrounds');
            //Looping through fake data and pushing it to the DB
            data.forEach(function(seed){
                Campground.create(seed, function(err, campground){
                    if(err){
                        console.log(err);
                    } else {
                        console.log('Added a campground');
                        //Create a comment
                        Comment.create(
                            {
                                text: 'OMG, this place is AMAZING',
                                author: 'PC'
                            }, function(err, comment){
                            if(err){
                                console.log(err);
                            } else {
                                campground.comments.push(comment);
                                campground.save();
                                console.log('Created a comment and pushed it to the DB');

                            }
                        })
                    }
                });
            });
        }
    });
}

module.exports = seedsDB;