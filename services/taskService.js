const mongoose = require('mongoose');
const Task = require('../models/task');

module.exports = {
    //adds a new task
    newTask: function(task) {
        return Task.create({
            task: task
        })
    }

    
}