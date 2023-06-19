const mongoose = require('mongoose');

const teamsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    idea: {
        type: String,
        required: true
    },
    owner: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    skills: {
        type: [String]
    },
    members: {
        type: [String]
    },
});

module.exports = mongoose.model('Team', teamsSchema);