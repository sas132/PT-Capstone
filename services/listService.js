const mongoose = require('mongoose');
const List = require('../models/list');
const Task = require('../models/task');

module.exports = {

	//adds a new list
	newList: async function(user) {
		return await List.create({
			owner: user._id
		})
	},

	getLists: async function(user) {
		// const lists = await List.find(
    //   { $or: [
    //     {'_id': user._id},
    //     {'tasks': { $elemMatch: { 'assignedUser': user._id } } }
    //   ] }
		// ).exec();
		
		const lists = await List.find(
      { $or: [
        {'owner': user._id},
        {'tasks': { $elemMatch: { 'assignedUser': user._id } } }
      ] }
    ).exec();

		return lists;
	},

	//updates the given list using the desired params
	updateList: function(id, change) {
		return List.findByIdAndUpdate(
			id,			//doc to update
			change,		//the change to implement
			{new: true}//return updated doc
		)
	}

	/*NO LONGER NEEDED
	//adds task to collection, links using list _id
	addTask: function(list, task) {
		return Task.create({
			listID: list,
			task: task
		})
	},

	//get tasks of a list
	getTasks: function(list) {
		return List.find( {listID: list} ).exec();
	},

	//assigns a user to the task
	setUser: function(taskID, userID) {
		return List.findByIdAndUpdate( taskID, {$set: {assignedUser: userID}}, {new: true}).exec();
	},

	*/

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
