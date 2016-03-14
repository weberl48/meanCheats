// gettin dem packages
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var port = process.env.PORT || 3000;


//setting up the app
mongoose.connect('mongodb://localhost/meancheats')
var User = require('./models/user');
// body-parser for post requests
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));


//CORS annoyance protection
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', "*");
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
  //carry on
  next();
});
//gotta see those requests via console
app.use(morgan('dev'));

//ROUTES API------------------------------------

app.get('/', function(req, res) {
  console.log(User)
  res.send('Home Route Ya')
});


var api = express.Router()

api.get("/", function(req, res) {
  console.log('api hit ');
  res.json({
    important: '/ api route Ya'
  });
});
api.use(function(req, res, next) {
    console.log('api hit');
    next()
  })
  //all api routes will start with /api
app.use('/api', api)
  // routes that end in /users
api.route('/users')
  //create user post to localhost:3000/api/users
  .post(function(req, res) {
    //instance of User model
    var user = new User();

    // set user data to input data
    user.name = req.body.name;
    user.username = req.body.username;
    user.password = req.body.password;
    //save the user to mongo, whilst doing the checking of the errors
    user.save(function(err) {
      if (err) {
        console.log(err);
        //if there is an error and its code is 11000 thats a duplicate username
        if (err.code == 11000) {
          console.log("adsfasdfasdfadsfadsfd");
          return res.json({
            success: false,
            message: 'A user with that username already exists.'
          });
        } else {
          return res.send(err)
        }
      } else {
        console.log('user created');
        res.json({
          message: 'User created'
        });
      }


    });
  })

.get(function(req, res) {
  User.find(function(err, users) {
    if (err) res.send(err)
    res.json(users);
  });
});

api.route('/users/:id')
  //get user with specfic id
  //localhost:3000/api/users/:id

.get(function(req, res) {
    User.findById(req.params.id, function(err, user) {
      if (err) res.send(err);

      //return single user_id
      res.json(user);
    });
  })
  .put(function(req, res) {
    User.findById(req.parms.id, function(err, user) {
      if (err) res.send(err);

      if (req.body.name) user.name = req.body.name;
      if (req.body.username) user.username = req.body.username;
      if (req.body.password) user.password = req.body.password;

      user.save(function(err) {
        if (err) res.send(err);
        res.json({
          message: 'user updated, chyeah'
        });
      });
    });
  })
  .delete(function(req, res) {
    User.remove({
      _id: req.params.id
    }).then(function(err, user) {
      console.log('adfadsfasdf');
      if (err) return res.send(err)
      res.json({
        message: "user deleted"
      });
    })
  })
  //fire up the server
app.listen(port);
console.log('server running on port ' + port);
