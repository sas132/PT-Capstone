const mongoose = require('mongoose');
const User = require('../models/user')

module.exports = {

	//add new users to db
	addUser: async function(userData) {
    // check if user already exists
    let result = await User.find( { auth_id: { $eq: userData.auth_id } } ).exec()
    if (result.length === 0) {
      // add user if user doens't exist
      result = await User.create(userData)
    } else {
      result = result[0];
    }
    return result;
  },

  getUserByAuth: async function(authid) {
    const user = await User.find(
      {'authId': authid}
    ).exec();
    console.log(user);
    return user;
  },

  //get all users with an email address
  getUsersByEmail: async function(input) {
    const users = await User.find(
      { $or: [
        {'name': {$regex : `.*${input}.*`}},
        {'email': {$regex : `.*${input}.*`}}
      ] }
    ).exec();
    console.log(users)
    return users;
  }
}