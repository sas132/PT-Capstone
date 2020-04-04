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

app.get("/auth", (request, response) => {
  response.send("test");
})

//add app user
app.post('/user', user.add);

//gets all lists for a user
app.get('/lists', user.lists);

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
