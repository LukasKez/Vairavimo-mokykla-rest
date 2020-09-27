var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  User = require('./api/models/userModel'),
  // <-- missing office and lecture data modules -->
  bodyParser = require('body-parser'),
  cors = require('cors');

// connect to MongoDB using mongoose
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_SERVER || 'mongodb://localhost/Vmdb');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use(cors());


var userRoutes = require('./api/routes/userRoutes');
var officeRoutes = require('./api/routes/officeRoutes');
var lectureRoutes = require('./api/routes/lectureRoutes');

// register the routes
userRoutes(app);
officeRoutes(app);
lectureRoutes(app);

// body parser interceptor for custom status pages
app.use(function (req, res) {
  res.status(404).send({ url: req.originalUrl + ' not found' })
});


app.listen(port);


console.log('Driving school\'s RESTful API server started on: ' + port + '\n');