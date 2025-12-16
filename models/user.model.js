const mongoose = require('mongoose');
var validator = require('validator');

const userRoles = require('../utils/userRoles');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [validator.isEmail, 'Enter a valid email']
    },
    password: {
        type: String,
        required: true
    },
    token: {
        type: String
    },
    role: {
        type: String,
        enum: [userRoles.USER, userRoles.ADMIN, userRoles.MANAGER],
        default: userRoles.USER
    },
    profileImg: {
        type: String,
        default: 'profile.jpg'
    }
});

module.exports = mongoose.model('User', userSchema);