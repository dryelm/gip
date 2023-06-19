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
    },
    public: {
        type: Boolean,
        default: true,
        required: true
    },
    creator: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Idea', ideasSchema);