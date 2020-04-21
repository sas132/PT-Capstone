const userService = require('../services/user');

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

module.exports = {
  removeUser: removeUser,
  addList: addList
}