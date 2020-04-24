const mongoose = require('mongoose');
const List = require('../models/list');
const Task = require('../models/task');
const User = require('../models/user');

module.exports = {

	//adds a new list
	newList: async function(user) {
		return await List.create({
			title: 'New List',
			description: 'Description...',
			owner: user._id
		})
	},

	getLists: async function(user) {
		let lists = await List.find(
      { $or: [
        {'owner': user._id},
        {'tasks': { $elemMatch: { 'assignedUser': user._id } } }
      ] }
		).exec();
		
		lists = await Promise.all(lists.map(async (list) => {
			list.tasks = await Promise.all(list.tasks.map(async (task) => {
				return await Task.findById(task._id);
			}));
			list.users = await Promise.all(list.users.map(async (user) => {
				return await User.findById(user._id);
			}));
			return list;
		}));

		return lists;
	},

	//updates the given list using the desired params
	updateList: async function(list) {
		return await List.findByIdAndUpdate(
			list._id,			//doc to update
			list,		//the change to implement
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
