let mongoose = require('mongoose');

let userSchema = mongoose.Schema({
	authId: String,
	name: String,
	nickname: String,
	email: String,
	emailVerified: Boolean,
	picture: String
})

module.exports = mongoose.model('User', userSchema);
