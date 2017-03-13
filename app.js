var path        = require('path'),
    bodyParser  = require('body-parser'),
    mongoose    = require('mongoose'),
    express     = require('express'),
    app         = express(),
    Campground  = require('./models/campground'),
    seedsDB     = require('./seed.js');

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

//setting up bodyParser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//setting up static assets
app.use(express.static('public'));

app.get('/', function (req, res) {
    res.render('home');
});

//INDEX - show all campsites
app.get('/campsites', function (req, res) {
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        } else {
            res.render('index', {
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
    res.render('new');
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
            res.render('show', {
                campground: selectedSite
            });
        }
    });
});

app.listen(3000, function () {
    console.log('Server started on port 3000');
});
