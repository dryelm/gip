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
    },
    about: {
        type: String,
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

module.exports = mongoose.model('User', userSchema);