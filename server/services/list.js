const mongoose = require('mongoose');
const List = mongoose.model('List');
const Task = mongoose.model('Task');

module.exports = {

	//adds task to collection, links using list _id
	addTask: function(listId, task) {
		return Task.create({
			listID: listId,
			goal: task
		})
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