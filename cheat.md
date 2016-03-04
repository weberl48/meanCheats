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
***
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
console.log('Visit me at http://localhost:3000')

```

In server.js the http module is used to create a server and the fs module is used to grab index.html and send it as a response to the user. The server is set to listen on port 3000. View index.html at localhost:3000.
***
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

***
## Node Routing with Express

To server multiple pages to users additional routes will be required. The express router can be used to achieve this. The express router provides routing APIs like .use(), .get(), .param(), and .route().

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
***
## Basic routes (Express)
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
})

// users page /admin/users
adminRouter.get('/users', function(req, res){
  res.send('Posts')
})
// apply routes to application
app.use('/admin', adminRouter);

```
