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

app.get('/', function (req, res) {
    res.render('home');
});

//INDEX - show all campsites
app.get('/campsites', function (req, res) {
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
app.post('/campsites', function (req, res) {
    //grabbing form data
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;

    var newCampsite = {
        name: name,
        image: image,
        description: description
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
app.get('/campsites/new', function (req, res) {
    res.render('campgrounds/new');
});

//SHOW - info about the particular site
app.get('/campsites/:id', function(req, res){

    // Campground.findById(req.params.id, function(err, selectedSite){
    //     if(err){
    //         console.log(err);
    //     } else {
    //         res.render('show', {
    //             campground: selectedSite
    //         });
    //     }
    // });

    Campground.findOne({_id: req.params.id}).populate('comments').exec(function(err, selectedSite){
        if(err){
            console.log(err);
        } else {
            console.log(selectedSite);
            res.render('campgrounds/show', {
                campground: selectedSite
            });
        }
    });
});

//==============
//COMMENTS NEW Route
//==============
app.get('/campsites/:id/comments/new', function(req, res){
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
app.post('/campsites/:id/comments', function(req, res){
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


//=============
//USER REGISTRATION
//=============

app.get('/register', function(req, res){
   res.render('register');
});

app.post('/register', function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render('/register');
        }
        passport.authenticate('local')(req, res, function() {
            res.redirect('/campsites');
        });
    });
});

app.get('/login', function(req, res){
   res.render('login');
});

app.post('/login', passport.authenticate('local'), function(req, res){
   res.redirect('/campsites');
});

//404 response
app.use(function (req, res, next) {
    // res.status(404).send("Sorry can't find that!")
    res.render('404');
});

app.listen(3000, function () {
    console.log('Server started on port 3000');
});
