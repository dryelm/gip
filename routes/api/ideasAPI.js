const express = require('express');
const router = express.Router();
const Ideas = require('../../models/IdeasDB');


router.get('/', async (req, res) => {
    const ideas = await Ideas.find();
    await res.json(ideas);
});


router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const project = await Ideas.find((project) => project.id === id);
    await res.json(project);
});

module.exports = router;