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
        const teams = await Teams.find({owner: req.user.username})
        res.render('MyTeams/myTeams.hbs', {"teams": teams});
    } catch (err) {
        res.status(500).json({ message: "Server Error" });
    }
});

module.exports = router;

