var path = require('path');
var express = require('express');
var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static('public'));

app.get('/', function(req, res){
   res.render('home');
});

app.get('/campsites', function(req, res){
   var campgrounds = [
      {name: 'Zlatorog Bohinj', image:'http://www.photosforclass.com/download/14435096036'},
      {name: 'Camping Sobed', image:'http://www.photosforclass.com/download/4835814837'},
      {name: 'Camping Bled', image:'http://www.photosforclass.com/download/1342367857'},
      {name: 'Spik', image:'http://www.photosforclass.com/download/15989950903'},
      {name: 'Zelena Laguna', image:'http://www.photosforclass.com/download/1430198323'}
   ];

   res.render('campsites', {
      campgrounds: campgrounds
   });
});

app.post('/campsites', function(req, res){
   res.send('You hit the post route!');
});

app.get('/campsites/new', function(req, res){
   res.render('newcampsite');
});

app.listen(3000, function(){
   console.log('Server started on port 3000');
});
