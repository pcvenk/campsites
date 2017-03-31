var path            = require('path'),
    bodyParser      = require('body-parser'),
    mongoose        = require('mongoose'),
    express         = require('express'),
    app             = express(),
    passport        = require('passport'),
    LocalStrategy   = require('passport-local'),
    session         = require('express-session'),
    flash           = require('connect-flash'),
    User            = require('./models/user'),
    seedsDB         = require('./seed.js'),
    methodOverride  = require('method-override'),
    connectDB       = require('./database/db');

var campgroundRoutes = require('./routes/campgrounds'),
    authRoutes       = require('./routes/auth'),
    commentRoutes    = require('./routes/comment'),
    indexRoutes      = require('./routes/index');

connectDB();
// seedsDB();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(methodOverride('_method'));

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

//connect-flash
app.use(flash());

//global var for identifying a user (so you dont have to pass in the user manually)
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});

//Routes
app.use('/campsites', campgroundRoutes);
app.use(authRoutes);
app.use('/campsites/:id/comments', commentRoutes);
app.use(indexRoutes);

app.listen(3000, function () {
    console.log('Server started on port 3000');
});
