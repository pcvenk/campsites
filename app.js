var path        = require('path'),
    bodyParser  = require('body-parser'),
    mongoose    = require('mongoose'),
    express     = require('express'),
    app         = express();

mongoose.connect('mongodb://localhost/yelpCamp');

var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String
});

var Campground = mongoose.model('Campground', campgroundSchema);

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
            res.render('campsites', {
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

    var newCampsite = {
        name: name,
        image: image
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
    res.render('newcampsite');
});

//SHOW - info about the particular site
app.get('/campsites/:id', function(req, res){
   res.send('Addtional info about the chosen site');
});

app.listen(3000, function () {
    console.log('Server started on port 3000');
});
