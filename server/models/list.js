let mongoose = require('mongoose');
const Schema = mongoose.Schema;

let listSchema = mongoose.Schema({
	name: String,
	task: [{
		type: Schema.Types.ObjectId,
		ref: 'Task'
	}]
})

module.exports = mongoose.model('List', listSchema);