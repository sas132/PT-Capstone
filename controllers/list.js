const listService = require('../services/listService');
const userService = require('../services/userService')

//adds a new list
const newList = async function(req, res) {
	try {
		const user = await userService.addUser(req.userData);
		const list = await listService.newList(user);
		res.send({msg: list});
	} catch(err) {
		res.status(500).send({msg: err});
		console.warn(err);
	}
}

const updateList = async function(req, res) {
	try {
		if (!req.body.owner) req.body.owner = undefined;
		const list = await listService.updateList(req.body);
		res.send({msg: list});
	} catch(err) {
		res.status(500).send({msg: err});
		console.warn(err);
	}
}

const getLists = async function(req, res) {
	try {
		const user = await userService.addUser(req.userData);
		const list = await listService.getLists(user);
		res.send({msg: list});
	} catch(err) {
		res.status(500).send({msg: err});
		console.warn(err);
	}
}

const deleteList = async function (req, res) {
	try {
		await listService.deleteList(req.params.listid);
		res.send({msg: 'list deleted'});
	} catch(err) {
		res.status(500).send({msg: err});
		console.warn(err);
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
	newList: newList,
	updateList: updateList,
	getLists,
	deleteList
//	removeTask: removeTask,
//	clearList: clearList
}
