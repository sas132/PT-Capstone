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
app.get('/list/new', jwtCheck, getUserData, list.newList);

//creates a new list
app.get('/lists', jwtCheck, getUserData, list.getLists);

//update list by id
app.put('/list', list.updateList);


// app.post('/list/new', list.newList);

//create new task with no assigned user, return created task
app.post('/task/new', task.newTask);

//update task by id
//app.put('/task', task.update);
app.put('/task', function(req, res) {
  res.send({
    msg: 'update task by id'
  });
})

//get users where email contains a string
//app.get('/user/email', user.getUserByEmail);
app.get('/user/email/:input', user.getUsersByEmail);

//gets all lists for a user
//app.get('/user/lists', user.getLists);
app.get('/userList', function(req, res) {
  res.send({
    msg: 'get lists for user'
  });
})

//gets user based on authID
//app.get('/user/:authid', user.getUserbyAuthID);
app.get('/userAuth', function(req, res) {
  res.send({
    msg: 'get user based on authid'
  });
})

// listen for requests :)
const listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
