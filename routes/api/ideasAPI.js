const express = require('express');
const router = express.Router();
const Ideas = require('../../models/IdeasDB');

router.get('/', async (req, res) => {
    const ideas = await Ideas.find({public : true}, {public: 0});
    await res.json(ideas);
});


router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const project = await Ideas.findOne((project) => project._id === id && project.public === true, {public: 0});
    await res.json(project);
});


module.exports = router;