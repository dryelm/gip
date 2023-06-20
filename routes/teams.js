const express = require('express');
const path = require("path");
const router = express.Router();
const Teams = require('../models/TeamsDB');

router.get('/', async (req, res) => {
    try {
        res.sendFile(path.join(`${__dirname}`, '..', 'views', 'TeamSearch', 'teamSearch.html'));
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get("/create", async (req, res) => {
    if (!req.isAuthenticated()){
        await res.redirect('/login');
        return;
    }

    await res.sendFile(path.join(`${__dirname}`, '..', 'views', 'CreateTeam', 'createTeam.html'));
});

module.exports = router;