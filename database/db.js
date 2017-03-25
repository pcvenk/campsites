var mongoose = require('mongoose');

function connectDB() {
    mongoose.connect('mongodb://localhost/yelpCamp');
    mongoose.connection
        .on('error', function(error){
            console.warn(error);
        })
        .once('open', function(){
            console.log('Connection Established');
        });
}

module.exports = connectDB;