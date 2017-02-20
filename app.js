var path = require('path');
var bodyParser = require('body-parser');
var express = require('express');
var app = express();

var campgrounds = [
    {name: 'Zlatorog Bohinj', image: 'http://www.photosforclass.com/download/14435096036'},
    {name: 'Camping Sobed', image: 'http://www.photosforclass.com/download/4835814837'},
    {name: 'Camping Bled', image: 'http://www.photosforclass.com/download/1342367857'},
    {name: 'Spik', image: 'http://www.photosforclass.com/download/15989950903'},
    {name: 'Zelena Laguna', image: 'http://www.photosforclass.com/download/1430198323'}
];

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

app.get('/campsites', function (req, res) {
    res.render('campsites', {
        campgrounds: campgrounds
    });
});

app.post('/campsites', function (req, res) {
    //grabbing form data
    var name = req.body.name;
    var image = req.body.image;

    var newCampsite = {
        name: name,
        image: image
    };
    //adding new site to the array
    campgrounds.push(newCampsite);

    res.redirect('/campsites');
});

app.get('/campsites/new', function (req, res) {
    res.render('newcampsite');
});

app.listen(3000, function () {
    console.log('Server started on port 3000');
});
