//load the express package and create our app
var express = require('express');
var app = express();
var path = require('path');

//send our index.html file to the user for the home package
app.get('/', function(req,res){
  res.sendFile([path.join(__dirname + '/index.html')]);
});

//start the server
app.listen(1137);
console.log("server runninr on port 1137");

// 1. get an instance of the router, 2. apply routes to it, 3. add those routes to our main app

// get an instance of the router
var adminRouter = express.Router();
 adminRouter.get('/', function(req,res){
  res.send('Dashboard');
})

// users page /admin/users
adminRouter.get('/users', function(req, res){
  res.send('Posts')
})
// apply routes to application
app.use('/admin', adminRouter);
