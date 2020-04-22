let mongoose = require('mongoose');

let userSchema = mongoose.Schema({
	auth_id: String,
	name: String,
	nickname: String,
	email: String,
	email_verified: Boolean,
	picture: String
})

module.exports = mongoose.model('User', userSchema);
