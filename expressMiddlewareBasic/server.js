//load the exprees package and create our app
var express = require('express'),
app = express();
var path = require('path');

//send our index.html file to the user for the home page
app.get('/', function(req, res){
  res.sendFile([path.join(__dirname + "/index.html")])
});

//start the server
app.listen(3000);
console.log("server running at port 3000");

//get an instance of the router

var adminRouter = express.Router();
// route middleware that will happen on every request
adminRouter.use(function(req,res,next){
  // log each request to the console
  console.log(req.method, req.url);
  //continue doing what we were doing and got to the route
  next();
});
adminRouter.get('/', function(req,res){
  res.send('Dashboard');
});

// users page /admin/users
adminRouter.get('users', function(req, res){
  res.send('Posts')
})

// apply routes to applicaiton
app.use('/admin', adminRouter);
