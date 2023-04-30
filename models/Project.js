const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
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

module.exports = mongoose.model('Project', projectSchema);