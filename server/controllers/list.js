const listService = require('../services/list');

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
	if(req.params.list && req.params.task && req.body.user) {
		await listService.assign(req.params.list, req.params.task , req.body.user);
	}
}

module.exports = {
	addTask: addTask,
	getTasks: getTasks,
	setUser: setUser
}