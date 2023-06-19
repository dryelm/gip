const express = require('express');
const router = express.Router();
const Teams = require('../../models/TeamsDB');

router.get('/', async (req, res) => {
    const teams = await Teams.find({public : true}, {public: 0});
    await res.json(teams);
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const team = await Teams.find((project) => project.id === id && project.public === true, {public: 0});
    await res.json(team);
});

module.exports = router;