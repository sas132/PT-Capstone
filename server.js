// server.js
const express = require('express');
const app = express();
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const { join } = require("path");

const authConfig = require("./auth_config.json");
const db = require("./models/db");

// Handle form submissions
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const list = require('./controllers/list');
const task = require('./controllers/task');
const user = require('./controllers/user');

const jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 500,
    jwksUri: `https://${authConfig.domain}/.well-known/jwks.json`
  }),
  audience: authConfig.audience,
  issuer: `https://${authConfig.domain}/`,
  algorithms: ['RS256']
});

app.use(express.static(join(__dirname, "build")));

app.get("/auth_config.json", (req, res) => {
  res.sendFile(join(__dirname, "auth_config.json"));
});

app.get("/", (_, res) => {
  res.sendFile(join(__dirname, "index.html"));
});

app.get("/test", (_, res) => {
  res.sendFile(join(__dirname, "test.txt"));
});

app.get("/api/external", jwtCheck, (req, res) => {
  res.send({
    msg: "Your access token was successfully validated!"
  });
});

app.use(function(err, req, res, next) {
  if (err.name === "UnauthorizedError") {
    return res.status(401).send({ msg: "Invalid token" });
  }

  next(err, req, res);
});

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