let mongoose = require('mongoose');

let userSchema = mongoose.Schema({
	name: String,
	points: Number
})

module.exports = mongoose.model('User', userSchema);
