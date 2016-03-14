// load the express package and create our application
var express = require('express'),
app = express();
var path = require('path');

// send our index.html file to the user for the home package
app.get('/', function(req,res){
  res.sendFile([path.join(__dirname + '/index.html')])
})

//start the server
app.listen(3000);
console.log('server running on port 3000');

var adminRouter = express.Router();
//router middleware that will happen on ever request
adminRouter.use(function(req,res,next){
  //log each request to the console
  console.log(req.method, req.url);
  //  continue doing what we were doing and go the the router
  next();
});
adminRouter.get('/', function(req,res){
  res.send('Dashboard');
});

//users page /admin/users
adminRouter.get('users', function(req,res){
  res.send('Posts');
});
//route middleware to validate :name
adminRouter.param('name', function(req,res,next,name){
  //do validation on name here
  console.log('doing name validations on ' + name);
  //once the calidation is done save the new item in the req
  req.name = name
  // got to the next thing
  next();

})
adminRouter.get('/users/:name', function(req,res){
  res.send('hello ' + req.params.name + '!');
});

// apply routes to application
app.use('/admin', adminRouter);
