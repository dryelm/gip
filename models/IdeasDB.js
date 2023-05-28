const mongoose = require('mongoose');

const ideasSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    skills: {
        type: [String]
    }
});

module.exports = mongoose.model('Idea', ideasSchema);