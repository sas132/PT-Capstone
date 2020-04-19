let mongoose = require('mongoose');
const Schema = mongoose.Schema;

let taskSchema = mongoose.Schema({
	assignedUser: [{
		type: Schema.Types.ObjectId,
		ref: 'User'
	}],
	completed: Boolean,
	goal: String,
	pointVal: Number,
	listID: String
})

module.exports = mongoose.model('Task', taskSchema);