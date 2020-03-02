// server.js
const express = require('express');
const app = express();

const db = require("./models/db");

// Handle form submissions
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let list = require('./controllers/list');
let task = require('./controllers/task');
let user = require('./controllers/user');

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(request, response) {
  response.sendFile(__dirname + '/index.html');
});


/**
 * These are just me throwing stuff down.
 * Very open to ideas if you have any.
 * This is not at all set in stone in terms of... well... everything?
 * ¯\_(?)_/¯
 *
//add app user
app.post('/user', user.add);

//gets all lists for a user
app.get('/:user/lists', user.lists);

//gets all tasks in a list
app.get('/:user/:list/tasks', list.tasks);

//adds a task to the list
app.post('/:user/:list/taskAdd', list.add);

//assign task to user
app.post('/:user/:list/', task.setUser);
*/

// listen for requests :)
const listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
