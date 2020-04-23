const taskService = require('../services/taskService');

//create a new task and returns the task
const newTask = async function(req, res) {
	try {
		if(req.body.task && req.body.listID) {
      task = await taskService.newTask(req.body.task);

			res.send({
				msg: JSON.stringify(task)
			});
		}
	} catch(err) {
		res.status(500).send({msg: err});
		console.warn(err);
	}
}

module.exports = {
  newTask: newTask
}