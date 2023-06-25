const express = require('express');
const router = express.Router();
const Teams = require('../models/TeamsDB');


router.get('/', async (req, res) => {
    if (!req.isAuthenticated()){
        req.session.returnTo = "/myteams";
        res.redirect("/login");
        return;
    }
    try {
        const teams = await Teams.find({ members: req.user.username });
        teams.forEach(team => {
            team.isOwner = (team.owner === req.user.username);
        });
        teams.forEach(team => {
            team.emptyCirclesArray = new Array(team.maxCountMembers - team.members.length).fill(0);
        });

        res.render('MyTeams/myTeams.hbs', {"teams": teams.filter(team => team.isActive)});
    } catch (err) {
        res.status(500).json({ message: "Server Error" });
    }
});

module.exports = router;

