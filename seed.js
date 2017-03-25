var mongoose = require('mongoose');
var Campground = require('./models/campground');
var Comment = require('./models/comment');

var data = [
    {
        name: 'Camp Danica',
        image: 'http://www.photosforclass.com/download/3062178880',
        description: "Austin mlkshk salvia 3 wolf moon. Twee chia ugh, literally banjo roof party leggings. Hella listicle wolf vegan readymade, church-key VHS fap neutra gluten-free enamel pin next level williamsburg. Enamel pin pabst farm-to-table, migas truffaut gentrify tumblr post-ironic dreamcatcher butcher swag yuccie jean shorts hoodie hella. Food truck cray trust fund gentrify, copper mug pabst you probably haven't heard of them hammock art party. XOXO gastropub plaid, ethical occupy jianbing poutine tote bag meh letterpress tofu kombucha. Artisan +1 four loko cronut sriracha venmo."
    },
    {
        name: 'Camp Zlatorog',
        image: 'http://www.photosforclass.com/download/32317369293',
        description: "Austin mlkshk salvia 3 wolf moon. Twee chia ugh, literally banjo roof party leggings. Hella listicle wolf vegan readymade, church-key VHS fap neutra gluten-free enamel pin next level williamsburg. Enamel pin pabst farm-to-table, migas truffaut gentrify tumblr post-ironic dreamcatcher butcher swag yuccie jean shorts hoodie hella. Food truck cray trust fund gentrify, copper mug pabst you probably haven't heard of them hammock art party. XOXO gastropub plaid, ethical occupy jianbing poutine tote bag meh letterpress tofu kombucha. Artisan +1 four loko cronut sriracha venmo."
    },
    {
        name: 'Camp Bled',
        image: 'http://www.photosforclass.com/download/9586944536',
        description: "Austin mlkshk salvia 3 wolf moon. Twee chia ugh, literally banjo roof party leggings. Hella listicle wolf vegan readymade, church-key VHS fap neutra gluten-free enamel pin next level williamsburg. Enamel pin pabst farm-to-table, migas truffaut gentrify tumblr post-ironic dreamcatcher butcher swag yuccie jean shorts hoodie hella. Food truck cray trust fund gentrify, copper mug pabst you probably haven't heard of them hammock art party. XOXO gastropub plaid, ethical occupy jianbing poutine tote bag meh letterpress tofu kombucha. Artisan +1 four loko cronut sriracha venmo."
    },
    {
        name: 'Zelena Laguna',
        image: 'http://www.photosforclass.com/download/2617791137',
        description: "Austin mlkshk salvia 3 wolf moon. Twee chia ugh, literally banjo roof party leggings. Hella listicle wolf vegan readymade, church-key VHS fap neutra gluten-free enamel pin next level williamsburg. Enamel pin pabst farm-to-table, migas truffaut gentrify tumblr post-ironic dreamcatcher butcher swag yuccie jean shorts hoodie hella. Food truck cray trust fund gentrify, copper mug pabst you probably haven't heard of them hammock art party. XOXO gastropub plaid, ethical occupy jianbing poutine tote bag meh letterpress tofu kombucha. Artisan +1 four loko cronut sriracha venmo."
    }
];

function seedsDB(){
    //Remove all campgrounds
    Campground.remove({}, function(err){
        if(err){
            console.log(err);
        } else {
            // console.log('removed all campgrounds');
            // //Looping through fake data and pushing it to the DB
            // data.forEach(function(seed){
            //     Campground.create(seed, function(err, campground){
            //         if(err){
            //             console.log(err);
            //         } else {
            //             console.log('Added a campground');
            //             //Create a comment
            //             Comment.create(
            //                 {
            //                     text: 'OMG, this place is AMAZING',
            //                     author: 'PC'
            //                 }, function(err, comment){
            //                 if(err){
            //                     console.log(err);
            //                 } else {
            //                     campground.comments.push(comment);
            //                     campground.save();
            //                     console.log('Created a comment and pushed it to the DB');
            //
            //                 }
            //             })
            //         }
            //     });
            // });
        }
    });
}

module.exports = seedsDB;