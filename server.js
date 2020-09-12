// require('dotenv').config();
var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  Task = require('./api/models/vmModel'),
  User = require('./api/models/userModel'),
  bodyParser = require('body-parser');

// connect to MongoDB using mongoose
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_SERVER || 'mongodb://localhost/Vmdb');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var vmRoutes = require('./api/routes/vmRoutes');
var userRoutes = require('./api/routes/userRoutes');
var officeRoutes = require('./api/routes/officeRoutes');

//register the routes
vmRoutes(app);
userRoutes(app);
officeRoutes(app);
//<--missing lecture routes-->

//body parser interceptor for custom status pages
app.use(function (req, res) {
  res.status(404).send({ url: req.originalUrl + ' not found' })
});


app.listen(port);


console.log('Driving school\'s RESTful API server started on: ' + port + '\n');