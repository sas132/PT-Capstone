const mongoose = require('mongoose');
const List = mongoose.model('List');
const Task = mongoose.model('Task');

module.exports = {

	//adds a new list
	newList: function(name) {
		return List.create({
			name: name
		})
	},

	//adds task to collection, links using list _id
	addTask: function(list, task) {
		return Task.create({
			list: list,
			goal: task
		})
	},

	//get tasks of a list
	getTasks: function(list) {
		return List.findById(list).exec();
	},

	//assigns a user to the task
	setUser: function(taskID, userID) {
		return List.findByIdAndUpdate( taskID, {$set: {assignedUser: userID}}, {new: true}).exec();
	},

	//not AS important
	/*
	removeTask: function(list, task, user) {
		return List.findByIdAndDelete()
	},

	clearList: function(list, user) {
		return List.remove
	}
	*/
}