var path            = require('path'),
    bodyParser      = require('body-parser'),
    mongoose        = require('mongoose'),
    express         = require('express'),
    app             = express(),
    passport        = require('passport'),
    LocalStrategy   = require('passport-local'),
    session         = require('express-session'),
    User            = require('./models/user'),
    seedsDB         = require('./seed.js');

var campgroundRoute = require('./routes/campgrounds'),
    authRoute       = require('./routes/auth'),
    commentRoute    = require('./routes/comment');

mongoose.connect('mongodb://localhost/yelpCamp');

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
app.use(commentRoute);

app.get('/', function (req, res) {
    res.render('home');
});


//404 response
app.use(function (req, res, next) {
    // res.status(404).send("Sorry can't find that!")
    res.render('404');
});

app.listen(3000, function () {
    console.log('Server started on port 3000');
});
