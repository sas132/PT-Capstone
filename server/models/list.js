let mongoose = require('mongoose');
const Schema = mongoose.Schema;

let listSchema = mongoose.Schema({
	name: String,
	owner: [{
		type: Schema.Types.ObjectId,
		ref: 'User'
	}]
})

module.exports = mongoose.model('List', listSchema);