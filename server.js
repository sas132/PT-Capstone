// server.js
const express = require('express');
const app = express();
const { join } = require("path");

const db = require("./models/db");
const { jwtCheck, getUserData } = require('./services/token')

// Handle form submissions
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const list = require('./controllers/list');
const task = require('./controllers/task');
const user = require('./controllers/user');

// serve the built react app
app.use(express.static(join(__dirname, "build")));

app.get("/api/external", jwtCheck, getUserData, (req, res) => {
  console.log('hello', req.userData)
  res.send({
    msg: "Your access token was successfully validated!"
  });
});

app.use(function(err, req, res, next) {
  console.log('hello')
  if (err.name === "UnauthorizedError") {
    return res.status(401).send({ msg: "Invalid token" });
  }

  next(err, req, res);
});

//add app user
app.post('/user', jwtCheck, getUserData, user.add);

//creates a new list
app.get('/list/new', function(req, res) {
  res.send({
    msg: "new list"
  });
});
app.post('/list/new', list.newList);

/* TO BE REPLACED WITH list.update
//adds a task to the list
app.get('/list/add', function (req, res) {
  res.send({
    msg: "add task to a list"
  });
});
app.post('/list/add', list.addTask);


//gets all tasks in a list
app.get('/list', function (req, res) {
  res.status(200);
  res.send({
    msg: "get List"
  });
  //allows user to select a task?
  //or should this just run for all lists and display all info in one go?
});
app.post('/list', list.getTasks);
*/

//create new task with no assigned user, return created task
app.post('/task/new', task.newTask);

//update list by id
//app.put('/list', list.update);
app.put('/list', function(req, res) {
  res.send({
    msg: 'update list by id'
  });
})

//update task by id
//app.put('/task', task.update);
app.put('/task', function(req, res) {
  res.send({
    msg: 'update task by id'
  });
})

//gets all lists for a user
//app.get('/user/lists', user.getLists);
app.get('/user/:list', function(req, res) {
  res.send({
    msg: 'get lists for user'
  });
})

//gets user based on authID
//app.get('/user/:authid', user.getUserbyAuthID);
app.get('/user/:authid', function(req, res) {
  res.send({
    msg: 'get user based on authid'
  });
})

//get users where email contains a string
//app.get('/user/email', user.getUserByEmail);
app.get('/user/email', function(req, res) {
  res.send({
    msg: 'get users with registered email'
  });
})


// listen for requests :)
const listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
