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
  res.status(200);
	//TODO: give page to enter list name?
});
app.post('/list/new', list.newList);

//adds a task to the list
app.get('/list/add', function (req, res) {
  res.status(200);
  //TODO: give page that allows entering task data
});
app.post('/list/add', list.addTask);

//gets all lists for a user
// app.get('/lists', user.lists);

//gets all tasks in a list
// app.get('/:list/tasks', list.getTasks);

//assign task to user
// app.post('/:list/assign', task.setUser);


// listen for requests :)
const listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
