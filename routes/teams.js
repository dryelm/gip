const express = require('express');
const path = require("path");
const router = express.Router();
const Teams = require('../models/TeamsDB');

router.get('/', async (req, res) => {
    //const teams = await Teams.find();
    // TODO: как вывести имена людей в команде?
    await res.sendFile(path.join(`${__dirname}`, '..', 'views', 'TeamSearch', 'teamSearch.html'));
});

module.exports = router;