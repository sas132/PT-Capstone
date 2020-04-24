const mongoose = require('mongoose');
const List = require('../models/list');
const Task = require('../models/task');
const User = require('../models/user');

module.exports = {

	//adds a new list
	newList: async function(user) {
		console.log('list', user)
		const newList = await List.create({
			title: 'New List',
			description: 'Description...',
			owner: user._id
		});
		console.log(newList);
		return newList;
	},

	getLists: async function(user) {
		console.log(user)
		let lists = await List.find(
      { $or: [
        {'owner': { $exists: true, $eq:user._id }},
        {'tasks': { $elemMatch: { 'assignedUser': user._id } } }
      ] }
		).exec();
		
		lists = await Promise.all(lists.map(async (list) => {
			list.tasks = await Promise.all(list.tasks.map(async (task) => {
				task = await Task.findById(task._id);
				task.assignedUser = await User.findById(task.assignedUser._id);
				return task;
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
			{new: true}	//return updated doc
		)
	},

	//deletes a list by id
	deleteList: async function(listid) {
		return List.findByIdAndDelete(listid).exec();
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
