const express = require('express');
const path = require("path");
const router = express.Router();
const Teams = require('../models/TeamsDB');
const Ideas = require("../models/IdeasDB");

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

router.post("/create", async (req, res) => {
    if (!req.isAuthenticated()){
        await res.redirect('/login');
        return;
    }

    const username = req.session.passport.user.username;
    const idea_id =  req.body.ideas_id;
    const idea = await Ideas.findOne({_id: idea_id});
    const skills = idea.skills;
    const name = idea.name;
    const description = req.body.description;
    const maxCountMembers = req.body.maxMembers;

    if (!(1<=maxCountMembers && maxCountMembers<=10)) {
        res.status(400).json({"message":"wrong maxCountMembers"});
        return;
    }
    const team = new Teams({
        name: name,
        idea: idea_id,
        owner: username,
        description: description,
        skills: skills,
        members: [],
        maxCountMembers: maxCountMembers
    });

    await team.save();

    await res.redirect('/ideas');

})

router.post('/create')
module.exports = router;