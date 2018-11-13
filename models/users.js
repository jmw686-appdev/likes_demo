const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    username: {type: String, index: true},
    password: { type: String, default: null }
});
module.exports = mongoose.model('User', userSchema);
