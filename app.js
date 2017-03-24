var path            = require('path'),
    bodyParser      = require('body-parser'),
    mongoose        = require('mongoose'),
    express         = require('express'),
    app             = express(),
    passport        = require('passport'),
    LocalStrategy   = require('passport-local'),
    session         = require('express-session'),
    Campground      = require('./models/campground'),
    Comment         = require('./models/comment'),
    User            = require('./models/user'),
    seedsDB         = require('./seed.js');

var campgroundRoute = require('./routes/campgrounds'),
    authRoute       = require('./routes/auth');

mongoose.connect('mongodb://localhost/yelpCamp');

// var newCampground = {
//     name: 'Zlatorog Bohinj',
//     image: 'http://www.photosforclass.com/download/15989950903',
//     description: "A really nice place to spend a week or so. Very Relaxing!"
// };
//
// Campground.create(newCampground, function(err, campground){
//     if(err){
//         console.log(err);
//     } else {
//         console.log(campground);
//     }
// });

seedsDB();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//passport config
app.use(session({
    secret: 'yelpCamp',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//setting up bodyParser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//setting up static assets
app.use(express.static(__dirname +'/public'));

//global var for identifying a user (so you dont have to pass in the user manually)
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});

//Routes
app.use(campgroundRoute);
app.use(authRoute);

app.get('/', function (req, res) {
    res.render('home');
});

app.get('/campsites/:id/comments/new', isLoggedIn, function(req, res){
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
app.post('/campsites/:id/comments', isLoggedIn, function(req, res){
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
    //if(req.isAuthenticated())
    if(req.isAuthenticated()){
        return next();
    } else {
        res.redirect('/login');
    }

}

//404 response
app.use(function (req, res, next) {
    // res.status(404).send("Sorry can't find that!")
    res.render('404');
});

app.listen(3000, function () {
    console.log('Server started on port 3000');
});
