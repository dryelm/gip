const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    telegram: {
        type: String,
        required: true,
        unique: true,
    },
    about: {
        type: String,
        required: true,
    },
    skills: {
        type: Array
    },
    finishedProjects: {
        type: Array
    },
    currentProjects: {
        type: Array
    },
    password: {
        type: String,
        required: true,
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
