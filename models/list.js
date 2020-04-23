let mongoose = require('mongoose');
const Schema = mongoose.Schema;

let listSchema = mongoose.Schema({
	title: String,
	description: String,
	owner: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
	users: [{
		type: Schema.Types.ObjectId,
		ref: 'User'
	}],
	tasks: [{
		type: Schema.Types.ObjectId,
		ref: 'Task'
	}]
})

module.exports = mongoose.model('List', listSchema);