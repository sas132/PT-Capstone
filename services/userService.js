const mongoose = require('mongoose');
const User = require('../models/user')

module.exports = {

	//add new users to db
	addUser: async function(userData) {
    try {
      // check if user already exists
      const test = await User.find( { auth_id: { $eq: userData.auth_id } } ).exec()
      let result = false;
      if (test.length === 0) {
        // add user if user doens't exist
        result = await User.create(userData)
      }
      return result;
    } catch(err) {
      console.warn(err);
    }
  }
}