const express = require('express');
const router = express.Router();
const Ideas = require('../../models/IdeasDB');


router.get('/', async (req, res) => {
    const ideas = await Ideas.find();
    res.json(ideas);
});


router.get('/:id', (req, res) => {
    const id = req.params.id;
    const project = Ideas.find((project) => project.id === id);
    res.json(project);
});

module.exports = router;