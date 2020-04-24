const mongoose = require('mongoose');
const User = require('../models/user')

module.exports = {

	//add new users to db
	addUser: async function(userData) {
    // check if user already exists
    let result = await User.find( { authId: { $eq: userData.authId } } ).exec()
    if (result.length === 0) {
      // add user if user doens't exist
      result = await User.create(userData)
    } else {
      result = await result[0];
    }
    return result;
  },

  getUserByAuth: async function(authid) {
    const user = await User.find(
      {'authId': { $eq: authid } }
    ).exec();
    console.log(user);
    return JSON.stringify(user);
  },

  //get all users with an email address
  getUsersByEmail: async function(input) {
    const users = await User.find(
      { $or: [
        {'name': {$regex : `.*${input}.*`}},
        {'email': {$regex : `.*${input}.*`}}
      ] }
    ).exec();
    return users;
  }
}