const mongoose = require('mongoose');

const skillsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
}, {
    toJSON: {
        virtuals: true
    },
    toObject: {
        virtuals: true
    }
});

module.exports = mongoose.model('Skill', skillsSchema);