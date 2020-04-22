const listService = require('../services/list');

//adds a new list
const newList = async function(req, res) {
	if(req.params.name) {
		await listService.newList(req.params.name);
	}
}

//add a task to a given list
const addTask = async function(req, res) {
	if(req.params.list && req.body.task.goal) {
		await listService.addTask(req.params.list, req.body.task);
	}
}

//get tasks from a given list
const getTasks = async function(req, res) {
	if(req.params.list) {
		await listService.getTasks(req.params.list);
	}
}

//assign a task to a user
const setUser = async function(req, res) {
	if(req.params.task && req.body.user) {
		await listService.assign(req.params.task, req.body.user);
	}
}

/*

//removes a task from a list
	//if final task, delete list??
const removeTask = async function(req, res) {
	if(req.params.list && req.params.task && req.body.user) {
		await listService.delete(req.params.list, req.params.task, req.params.user);
	}
}

//clear a list of all tasks
const clearList = async function(req, res) {
	if(req.params.list && req.params.user) {
		await listService.clearList(req.params.list, req.params.user);
	}
}

*/

module.exports = {
	addTask: addTask,
	getTasks: getTasks,
	setUser: setUser,
	newList: newList
//	removeTask: removeTask,
//	clearList: clearList
}