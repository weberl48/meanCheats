<!-- TOC depthFrom:1 depthTo:6 withLinks:1 updateOnSave:1 orderedList:0 -->

- [Node](#node)
	- [Basic Node Configuration (package.json)](#basic-node-configuration-packagejson)
		- [package.json example](#packagejson-example)
	- [Installing Packages](#installing-packages)
	- [Commands](#commands)
	- [Basic Node HTTP server](#basic-node-http-server)
		- [package.json](#packagejson)
		- [index.html](#indexhtml)
		- [server.js](#serverjs)
	- [Express Server](#express-server)
		- [package.json](#packagejson)
		- [index.html](#indexhtml)
		- [server.js](#serverjs)
	- [Node Routing with Express](#node-routing-with-express)
		- [express.Router()](#expressrouter)
	- [Basic routes - Express](#basic-routes-express)
		- [package.json](#packagejson)
		- [index.html](#indexhtml)
		- [server.js](#serverjs)
	- [Route Middleware - router.use()](#route-middleware-routeruse)
	- [Route Parameters - /user/:id](#route-parameters-userid)
	- [Middleware for Parameters - .param()](#middleware-for-parameters-param)
	- [Login Routes - app.route()](#login-routes-approute)
	- [Bullets](#bullets)
- [MongoDB](#mongodb)
	- [Commands](#commands)
		- [Common](#common)
		- [CRUD](#crud)
	- [Mongo and Node](#mongo-and-node)
		- [Connection to a DB using mongoose](#connection-to-a-db-using-mongoose)
- [RESTful Node API (Application Programming Interface)](#restful-node-api-application-programming-interface)
	- [package.json](#packagejson)
	- [server.js](#serverjs)
	- [user.js](#userjs)
	- [API routes](#api-routes)
		- [User POST - /api/Users](#user-post-apiusers)
		- [User GET all - /api/users](#user-get-all-apiusers)
		- [User Get single - /api/users/:id](#user-get-single-apiusersid)
		- [User PUT update - /api/users/:id](#user-put-update-apiusersid)
		- [User DELETE remove user - /api/users/:id](#user-delete-remove-user-apiusersid)
- [Node Authentication - Token Based](#node-authentication-token-based)
	- [Why Server based Auth is old school](#why-server-based-auth-is-old-school)
	- [Why token based Auth is new school cool](#why-token-based-auth-is-new-school-cool)
		- [Benefits](#benefits)
			- [Stateless and scalable](#stateless-and-scalable)
			- [Security](#security)
	- [JSON Web Tokens](#json-web-tokens)

<!-- /TOC -->

# Node
## Basic Node Configuration (package.json)
Node apps are configured via a package.json file. This is where you set the name, version, repository, author, and package dependancies. The format of the file is an object literal, where properties are defined via a key value pair relationship. The key Main tells node which file to use to start the application.

### package.json example

```
    {
    "name" ; "app-name",
    "version" : '1.0.0',
    "description": "best app ever",
    "main": 'server.js',
    "repository": {
      "type" : 'git',
      "url" : "https://github.com/bestappever",
    },
    "dependancies": {
      "express" : "version #"
      "mongoose": "version #"
    },
    "author" : "Liam Neeson"
    }
```

## Installing Packages
Packages can be installed by manually writing them in the package.json file, or through the command line. When installing with the command line make sure to use the --save modifier to add the package to package.json. Packages will be installed into a directory called node_modules, this is where packages live inside Node projects.

## Commands

```
- npm init          //Initialize node project and create package.json file
- node server.js    //Start node application
- nodemon server.js //Start node app with npm package nodemon to watch for file changes
- npm install package-name --save           //Install package via command line.
- npm install package another-package --save //Install multiple packages
- npm install       // Install all dependancies listed in package.json file.
```

--------------------------------------------------------------------------------

## Basic Node HTTP server

```
Structure
├── nodeApp/
│   ├── index.html
│   ├── server.js
│   ├── package.json
```

### package.json

```
{
  "name": "http-server",
  "main" : "server.js",
}
```

### index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
      <meta charset="UTF-8">
      <title>Basic Node Server</title>
      <style>
          body{
            text-align:center;
            background:grey;
            padding-top:50px;
            }
      </style>
</head>
<body>
<h1>Hello World</h1>
</body>
</html>
```

### server.js

```js
// get the http and filesystem modules
var http = require('http'), fs = require('fs');
// create our server using the http module
http.createServer(function(req, res) {
  // write to our server. set configuration for the response
  res.writeHead(200, {
    'Content-Type': 'text/html',
    'Access-Control-Allow-Origin' : '*'
});
  // grab the index.html file using fs
var readStream = fs.createReadStream(__dirname + '/index.html');
// send the index.html file to our user
  readStream.pipe(res);
}).listen(3000);
// tell ourselves what's happening
console.log('Visit me at http://localhost:3000');
```

In server.js the http module is used to create a server and the fs module is used to grab index.html and send it as a response to the user. The server is set to listen on port 3000. View index.html at localhost:3000.

--------------------------------------------------------------------------------

## Express Server
Express is a framework for node use to create MVC web apps and REST APIs. Install express using npm install express --save

```
Structure
├── nodeApp/
│   ├── index.html
│   ├── server.js
│   ├── package.json
```

### package.json

```
{
  "name": "expressserver",
  "version": "1.0.0",
  "description": "",
  "main": "server.js",
  "author": "your name",
  "license": "ISC",
  "dependencies": {
    "express": "^4.13.3"
  }
}
```

### index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
      <meta charset="UTF-8">
      <title>Basic Node Server</title>
      <style>
          body{
            text-align:center;
            background:grey;
            padding-top:50px;
            }
      </style>
</head>
<body>
<h1>Hello World</h1>
</body>
</html>
```

### server.js

```js

// load the express package and create our app
var express = require('express')
var app = express();

var path = require('path');

//send out index.html file to the user for the home package
app.get('/', function(req, res){
  res.sendFile(path.join(__dirname +'/index.html'));
});

//start the server
app.listen(3000);
console.log('server running on port 3000');
```

--------------------------------------------------------------------------------

## Node Routing with Express
To server multiple pages to users additional routes will be required. The express router can be used to achieve this. The express router provides routing APIs like .use(), .get(), .param(), and .route().

Using the Router(),

### express.Router()
Call an instance of express.Router() and define routes on that. For Example in applications an adminRouter is usually created to handle admin specific routes. This is useful because we can create multiple instances of the express router allowing for our basic routes, authenticated routes, and API routes.

```js
var adminRouter = express.Router([options]);
app.use('/admin', adminRouter);
```

<table>
<thead>
<tr>
<th>Property</th>
<th>Description</th>
<th>Default</th>
<th>Availability</th>
</tr>
</thead>
<tbody>
<tr>
<td><code class="highlighter-rouge">caseSensitive</code></td>
<td>Enable case sensitivity.</td>
<td>Disabled by default, treating “/Foo” and “/foo” as the same.</td>
<td> </td>
</tr>
<tr>
<td><code class="highlighter-rouge">mergeParams</code></td>
<td>Preserve the <code class="highlighter-rouge">req.params</code> values from the parent router. If the parent and the child have conflicting param names, the child’s value take precedence.</td>
<td><code class="highlighter-rouge">false</code></td>
<td>4.5.0+</td>
</tr>
<tr>
<td><code class="highlighter-rouge">strict</code></td>
<td>Enable strict routing.</td>
<td>Disabled by default, “/foo” and “/foo/” are treated the same by the router.</td>
<td> </td>
</tr>
</tbody>
</table>

--------------------------------------------------------------------------------

## Basic routes - Express

```
Structure
├── nodeApp/
│   ├── index.html
│   ├── server.js
│   ├── package.json
```

### package.json

```
{
  "name": "expressserver",
  "version": "1.0.0",
  "description": "",
  "main": "server.js",
  "author": "your name",
  "license": "ISC",
  "dependencies": {
    "express": "^4.13.3"
  }
}
```

### index.html

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Basic Express Routes</title>
  </head>
  <body>

  </body>
</html>
```

### server.js

```js
//load the express package and create our app
var express = require('express');
var app = express();
var path = require('path');

//send our index.html file to the user for the home package
app.get('/', function(req,res){
  res.sendFile([path.join(__dirname + '/index.html')]);
});

//start the server
app.listen(3000);
console.log("server runninr on port 3000");

// 1. get an instance of the router, 2. apply routes to it, 3. add those routes to our main app

// get an instance of the router
var adminRouter = express.Router();
 adminRouter.get('/', function(req,res){
  res.send('Dashboard');
});

// users page /admin/users
adminRouter.get('/users', function(req, res){
  res.send('Posts')
})
// apply routes to application
app.use('/admin', adminRouter);
```

--------------------------------------------------------------------------------

## Route Middleware - router.use()
Middleware is a way to do something before a request is processed. For example checking if a user is authenticated and logging date for analytics. Make sure you place middleware after your router declaration and before and defined routes. The next() argument is used to tell Express that the middleware function is complete. The order you place your middleware and routes is very important.

```js
adminrouter.use(function(req,res,next){
  // logging each request made to console
  console.log(req.method , req.url);
// continue to the route
  next();
});
```

--------------------------------------------------------------------------------

## Route Parameters - /user/:id
Express can handle route parameters. Route parameters can be used to validate data coming into your application. This could be used to validate a token for a REST API.

```
//user ID is passed into the url   /admin/users/:name
```

```js

adminRouter.get('/users/:name', function(req,res){
  res.send('hello'+ req.params.name + '!');
});
```

--------------------------------------------------------------------------------

## Middleware for Parameters - .param()
Creates middleware that will run for a certain route parameter.

```js
adminRouter.param('name' , function(req, res, next, name){
  //do validations http-server

  //once validations done save item in the req

  req.name = name;
  // do the thing
  next();

  });

  //route middleware is acting upon localhost:3000/admin/hello/:name
  //When the /hello/:name route is hit the .param() middleware will be used.

  adminRouter.get('/hello/:name', function(req ,re) {
    res.send('hello' + req.name + '!');
  });
```

--------------------------------------------------------------------------------

## Login Routes - app.route()
routes can be defined on the app variable, like calling express.Router(). This allows you to define multiple actions on a single login route. Routes are applied directly to the main app object.

```js
admin.route('/login')
      // show form localhost:3000/login
    .get(function(req,res){
      res.send('login form');
    });
    // process the form
    .post(function(req,res){
      res.send('processing login form')
    })
```

--------------------------------------------------------------------------------

## Bullets
- use express.Router() multiple times to define groups of routes
- apply the express.Router() to a section of the site using app.use()
- use route middleware to process requests
- use route middleware to validate parameters using .param()
- use app.route() to define multiple requests on a route
- <hr style="border-style:dashed; border-width:5px;
" />







# MongoDB
[Manual](https://goo.gl/e0BLwb)

## Commands
Rather than making queries to a table like in a traditional SQL database, queries using Mongo will be made to collections of documents. Stored in JSON style. Mongo will not create a database unless you insert information into that database

### Common

```
mongod          - connect to Mongo instance
show databases  - list all databases
db              - show current database
use db_name     - select a database
```

### CRUD

```
Create: Creates both database and collection if they do not already exist

db.users.save({ name: 'Bob'});                  - save one user
db.users.save([{name: 'Bob'}, {name: "Tod"}]);  - save multiple users

Read:

db.users.find();              - show all users
db.users.find({name: 'Bob'}); - find a specific user

Update:

db.users.update({name: 'Bob'}, {name:'Bob Tod'}); - update user value

Delete:

db.users.remove({});           - remove all
db.users.remove({name:'Bob'}); - remove one
```

## Mongo and Node
I use the node package mongoose when working with Mongo.

### Connection to a DB using mongoose

```js
//grab mongoose package
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/db_name')
```

# RESTful Node API (Application Programming Interface)
Express will be the node framework used, morgan allows loggin requests to the console, mongoose is an ODM for communication with Mongo, body-parser is used to pull POST content from an HTTP request, and bcrypt is used to has passwords to be stored in a mongo document.

```
Structure
- app/
----- models/
----------user.js       // user model
- node_modules/        // dependencies/packages
- package.json        // app dependencies
- server.js          // configure application and create routes
```

## package.json

```
npm install express morgan mongoose body-parser bcrypt-nodejs --save

{
"name" ; "nodeApi",
"version" : '1.0.0',
"main": 'server.js',
"dependancies": {
  "express" : "version #",
  "mongoose": "version #",
  "body-parser": "version #",
  "bcrypt-nodejs": "version #",
}
}
```

## server.js

```js
// gettin dem packages
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var port = process.env.PORT || 3000;

//setting up the app
mongoose.connect('mongodb://localhost/meancheats')
var User = require('./app/models/user');
// body-parser for post requests
app.use(bodyParser.urlencoded({extend: true}));
app.use(bodyParser.json());


//CORS annoyance protection
app.use(function(req,res,next){
  res.setHeader('Access-Control-Allow-Origin', "*");
  res.setHeader('Access-Control-Allow-Methods','GET, POST');
  res.setHeader('Access-Control-Allow-Headers','X-Requested-With,content-type,Authorization');
  //carry on
  next();
});
//gotta see those requests via console
app.use(morgan('dev'));

//ROUTES API------------------------------------

app.get('/', function(req,res){
  res.send('Home Route Ya')
});


var api = express.Router() //instance of Router
//api route middleware
api.use(function(req,res,next){
  console.log('api hit');
  next() //finish route
})
api.get("/", function(req,res){
  res.json({important: '/ api route Ya'});
});

//all api routes will start with /api
app.use('/api', apiRouter)

//fire up the server
app.listen(port);
console.log('server running on port ' + port );
```

## user.js
- create Schema setting name, username, and password as Strings
- setting index and unique prevents the username from being duplicated
- setting select: false on passwords prevents it from being shown when making db queries
- .pre() ensures password is hashed before being saved
- added a passwordCheck method on UserSchema to validate input with stored data

```js
// grabbing packages
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');
// user schema
var UserSchema = new Schema({
  name: String,
  username: {type: String, required: true, index: {unique :true}},
  password: {type: String, required: true, select:false}
})
// using bcrypt to hash the password before it is saved
UserSchema.pre('save', function(next){
  var user = this;
//if user isn't new and password wasn't changed then do not create a hash
  if(!user.isModified('password')) return next();
// making that hash
  bcrypt.hash(user.password, null, null, function(err, hash){
    if (err) return next(err);
    //setting the hashed pw
    user.password = hash
    next();
  });
});

// checking input password with hashed to see if they match
UserSchema.methods.passwordCheck = function(password) {
  var user = this;

  return bcrypt.compareSync(password, user.password);
};

// exporting the model so the rest of the app can use it
module.exports = mongoose.model('User', userSchema);
```

## API routes
<table>

<tr>

<th>Route</th>

<th>Verb</th>

<th>Action</th> </tr>

<tr><td>/api/users</td><td>GET</td><td>Get all Users</td></tr>

<tr><td>/api/users</td><td>POST</td><td>Create a user</td></tr>

<tr><td>/api/users/:user_id</td><td>GET</td><td>Get a single user</td></tr>

<tr><td>/api/users/:user_id</td><td>PUT</td><td>Update a user</td></tr>

<tr><td>/api/users/:user_id</td><td>DELETE</td><td>Delete a user</td></tr> </table>

### User POST - /api/Users
server.js below middleware

```js
// routes that end in /users
api.route('/users')
  //create user post to localhost:3000/api/users
  .post(function(req,res){
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
        if(err.code == 11000)
          return res.json({success: false, message: 'A user with that username already exists.'});
        else
            return res.send(err)
      }
          res.json({message: 'User created'});

    });
  });
```

### User GET all - /api/users
server.js below middleware

```js
api.route('/users')
  .post(function(req,res) {
    //create a user
  })
  // get all users in the database GET localhost:3000/api/users
  .get(function(req,res){
    User.find(function(err, users){
      if (err) res.send(err)
      //return users if no errors
      res.json(users);
    });
  });
```

### User Get single - /api/users/:id
server.js

```js
api.route('/users/:id')
  //get user with specfic id
  //localhost:3000/api/users/:id

  .get(function(req,res){
    User.findById(req.params.id, function(err,user){
      if(err) res.send(err);

      //return single user_id
      res.json(user);
    });
  })
```

### User PUT update - /api/users/:id
server.js

```js

api.route('/users/:id')
  .get(function(req,res){
    //get single user
  })
  //update user
  .put(function(req,res){
    //find user by id
    User.findById(req.parms.id , function(err, user) {
      if (err) res.send(err);
      // update the users info only if its new
      if (req.body.name) user.name = req.body.name;
      if (req.body.username) user.username = req.body.username;
      if (req.body.password) user.password = req.body.password;
      // save the updates
      user.save(function(err){
        if (err) res.send(err);
        res.json({message: 'user updated, chyeah'});
      });
    });
  })
```

### User DELETE remove user - /api/users/:id
server.js

```js
api/route('/users/:id')
.delete(function(req,res){
User.remove({
  _id: req.params.id
}).then(function(err,user){

  if (err) return res.send(err)
  res.json ({message: "user deleted"});
})
  })
```
# Node Authentication - Token Based

Their are many ways to implement authentication but one of the most widely used is token based auth. The main benefits to token based authentication is the ability to create stateless and scalable servers, mobile application ready, OAuth and added security.

In traditional server authentication user login information is stored on the server via session, memory or stored disk. The HTTP protocol is stateless meaning if authentication is done based upon that the server would forget who the user is on every new request.

SERVER VS TOKEN
![server vs toke](https://camo.githubusercontent.com/7a5f442d1c4a49fb1e0a97625be8694aad2026b5/68747470733a2f2f646c2e64726f70626f7875736572636f6e74656e742e636f6d2f752f32313636353130352f636f6f6b69652d746f6b656e2d617574682e706e67)

## Why Server based Auth is old school
<strong>Sessions:</strong> storing user information in memory can create overhead when many users are authenticating.
<strong>Scalability:</strong> cloud providers start replicating servers to handle application load, having vital information in session memory will limit ability to scale.
<strong>CORS:</strong> could run into problems with forbidden requests. For example when using multiple mobile devices.
<strong>CSRF:</strong> users could be victim to cross-site forgery.

## Why token based Auth is new school cool

- token based authentication is stateless.
- no information about the user is stored in server or session
- no session info means app can scale and add more machines as necessary regardless of where user is logged in.
- every request after the first will require the token
- token should be sent in HTTP header
- to accept requests from all domains using Access-Control-Allow-Origin: *
- data access permissions can be set on tokens for third party applications.

1. User Requests Access with Username / Password
2. Application validates credentials
3. Application provides a signed token to the client
4. Client stores that token and sends it along with every request
5. Server verifies token and responds with data

### Benefits

#### Stateless and scalable
- tokens are stored on client side, stateless and ready to be scaled.
- can be passed along to any server, useful in load balancing because their is no state or session.
- token holds the user data

#### Security

- because no cookie is being sent, the feasibility of a CSRF attack drops dramatically.
- token can be stored in a cookie, cookie is not used to authenticate token inside cookie is.
- token can expire after a set amount of time, requiring a user to log in again.
- selective permissions to third party apps.

## JSON Web Tokens

![jwt](https://cask.scotch.io/2014/11/json-web-token-overview1.png)
