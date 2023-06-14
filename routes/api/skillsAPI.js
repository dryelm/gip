const express = require('express');
const router = express.Router();
const SkillsDB = require('../../models/SkiilsDB');


router.get("/", async (req, res) => {
    const skills = await SkillsDB.find();
    await res.json(skills);
});


module.exports = router;
