
// load the express package and create our app
var express = require('express')
var app = express();
var path = require('path');

//send out index.html file to the user for the home package
app.get('/', function(req, res){
  res.sendFile(path.join(__dirname +'/index.html'));
});

//start the server
app.listen(1137);
console.log('server running on port 1137');
