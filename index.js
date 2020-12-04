
var http = require('http');
var express = require('express');
var app = express();
var server = http.createServer(app);
var morgan  = require('morgan');
var bodyParser = require('body-parser');
var compression = require('compression');
var cors = require('cors');

var userRouter = require('./routes/user');
require('dotenv').config();

require('dotenv').config();
app.set('port', process.env.PORT || 3000);

app.use(cors());


if (app.get('env') === 'production') {
  app.use(function (req, res, next) {
    var protocol = req.get('x-forwarded-proto');
    protocol == 'https' ? next() : res.redirect('https://' + req.hostname + req.url);
  });
}   
app.use(function (err, req, res, next) {
  console.log('This is the invalid field ->', err.field)
  next(err)
})
app.use(function (err, req, res, next) {
  console.log('This is the invalid field ->', err.field)
  next(err)
})
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(compression());
app.set('port', process.env.PORT || 3000);
app.set("view engine", "ejs");

app.use('/user', userRouter);

app.use(express.static(__dirname + '/public'));

app.get('*', function (req, res) {
  
  
  res.render("index", { resources: ["result.resources"] });
  
  /*cloudinary.api.resources(
    { type: 'upload', max_results: 5000 },
    function (error, result) {
      //console.log(result, error); 
      //res.json(result);
      res.render("index", { resources: result.resources });
    });
*/
  // load the single view file (angular will handle the page changes on the front-end)
});



server.listen(app.get('port'), function () {
  console.log("listeing on server");
});



//heroku local web










