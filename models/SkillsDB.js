const mongoose = require('mongoose');
const Ideas = require("./IdeasDB");

const skillsSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true }

},
    {toJSON: { virtuals: true },
            toObject: { virtuals: true }
});
async function generateSkills() {
    const skills = await Ideas.distinct('skills');
    await Skills.insertMany(skills.map(skill => ({ name: skill })), { ordered: false });
}
module.exports = mongoose.model('Skill', skillsSchema);


