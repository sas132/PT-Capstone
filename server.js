// server.js
const express = require('express');
const app = express();
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const { join } = require("path");

const authConfig = require("./src/auth_config.json");
const AuthenticationClient = require("auth0").AuthenticationClient;
const auth0 = new AuthenticationClient(authConfig)

const db = require("./models/db");

// Handle form submissions
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// app.use(cors({ origin: 'http://localhost:3001' }));

const list = require('./controllers/list');
const task = require('./controllers/task');
const user = require('./controllers/user');

const jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 10,
    jwksUri: `https://${authConfig.domain}/.well-known/jwks.json`
  }),
  audience: authConfig.audience,
  issuer: `https://${authConfig.domain}/`,
  algorithms: ['RS256']
});

const getUserData = (req, res, next) => {
  const token = req.headers.authorization.replace('Bearer ', '')
  console.log(token)
  auth0.getProfile(token, function (err, userInfo) {
    if (err) {
      console.warn(err)
    }
    req.userData = userInfo
    next()
  });
}

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
// app.post('/user', user.add);

//creates a new list
app.get('/list/new', function(req, res) {
  res.send({
    msg: "Create list"
  });
	//give page to enter list name
});
//app.post('/list/new', list.newList);

// //gets all lists for a user
// app.get('/:user/lists', user.lists);

// //gets all tasks in a list
// app.get('/:list/tasks', list.getTasks);

// //adds a task to the list
// app.post('/:list/taskAdd', list.addTask);

// //assign task to user
// app.post('/:list/assign', task.setUser);


// listen for requests :)
const listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
