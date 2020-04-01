const mongoose = require('mongoose');
const List = mongoose.model('List');

module.exports = {

	//adds task to list
	addTask: function(listId, task) {
//TODO: finish this
		return List.create()
	},

	//get tasks of a list
	getTasks: function(list) {
		return List.findById(list).exec();
	},

	//assigns a user to the task
	setUser: function(list, taskID, userID) {
//TODO: Cannot figure out the proper formatting for this
		return List.findByIdAndUpdate( list, {$set: { taskID: userID}} ).exec();
	}

}