const listService = require('../services/listService');

//adds a new list
const newList = async function(req, res) {
	if(req.body.name) {
		await listService.newList(req.body.name);
	}
	res.redirect('/list/new'); //could also redirect back home??
}

//add a task to a given list
const addTask = async function(req, res) {
	if(req.body.listID && req.body.task) {
		await listService.addTask(req.body.listID, req.body.task);
	}
	res.redirect('/list/add');
}

//get tasks from a given list
const getTasks = async function(req, res) {
	let tasks = await listService.getTasks(req.params.list);
	res.send({
		msg: JSON.stringify(tasks)
	});
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
