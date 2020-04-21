// server.js
const express = require('express');
const app = express();

const db = require("./models/db");

// Handle form submissions
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const list = require('./controllers/list');
const task = require('./controllers/task');
const user = require('./controllers/user');

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(request, response) {
  response.sendFile(__dirname + '/index.html');
});

app.get("/auth", (request, response) => {
  response.send("test");
})

//add app user
app.post('/user', user.add);

//creates a new list
app.get('/list/new/:name', list.newList);

//gets all lists for a user
app.get('/:user/lists', user.lists);

//gets all tasks in a list
app.get('/:list/tasks', list.getTasks);

//adds a task to the list
app.post('/:list/taskAdd', list.addTask);

//assign task to user
app.post('/:list/assign', task.setUser);


// listen for requests :)
const listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
