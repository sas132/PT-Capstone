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
    await userService.addUser(req.userData);
    res.status(200).send(req.userData);
  } catch(err) {
    res.status(500).send({msg: err});
    console.warn(err);
  }
}

const getUsersByEmail = async function(req, res) {
  try {
    users = await userService.getUsersByEmail()
    res.send({msg: users});
  } catch(err) {
    res.status(500).send({msg: err});
    console.warn(err);
  }
}

module.exports = {
  removeUser: removeUser,
  addList: addList,
  getUsersByEmail: getUsersByEmail
}