const taskService = require('../services/taskService');

//create a new task and returns the task
const newTask = async function(req, res) {
	try {
		const task = await taskService.newTask(req.body.task);
		res.send({msg: task});
	} catch(err) {
		res.status(500).send({msg: err});
		console.warn(err);
	}
}

const updateTask = async function(req, res) {
	console.log(req.body)
	try {
		const task = await taskService.updateTask(req.body);
		res.send({msg: task});
	} catch(err) {
		res.status(500).send({msg: err});
		console.warn(err);
	}
}

module.exports = {
	newTask: newTask,
	updateTask
}