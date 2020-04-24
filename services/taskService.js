const mongoose = require('mongoose');
const Task = require('../models/task');

module.exports = {
    //adds a new task
    newTask: async function() {
        return await Task.create({
            task: 'New Task',
            completed: false,
            points: 0
        })
    },

    //deletes a task by id
	deleteTask: async function(taskid) {
		return Task.findByIdAndDelete(taskid).exec();
	}
}