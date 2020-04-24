const userService = require('../services/userService');

//remove list from user
//I dont remember what I meant when I typed these words...
const removeUser = async function(req, res) {
  //just delete the list?? i have no clue
}

//add list to users viewable lists
const addList = async function(req, res) {
  if (req.param.user && req.param.list) {
    //link list to user
  }
}

const add = async function(req, res) {
  try {
    const result = await userService.addUser(req.userData);
    res.status(200).send({msg: result});
  } catch(err) {
    res.status(500).send({msg: err});
    console.warn(err);
  }
}

const getUserByAuth = async function(req, res) {
  try {
    const user = await userService.getUserByAuth(req.params.authid);
    res.send({msg: user});
  } catch(err) {
    res.status(500).send({msg: err});
    console.warn(err);
  }
}

const getUsersByEmail = async function(req, res) {
  try {
    const users = await userService.getUsersByEmail(req.params.input);
    res.send({msg: users});
  } catch(err) {
    res.status(500).send({msg: err});
    console.warn(err);
  }
}

module.exports = {
  removeUser: removeUser,
  add: add,
  addList: addList,
  getUserByAuth: getUserByAuth,
  getUsersByEmail: getUsersByEmail
}