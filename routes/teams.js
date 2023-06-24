const express = require('express');
const path = require("path");
const router = express.Router();
const Teams = require('../models/TeamsDB');
const Ideas = require("../models/IdeasDB");
const SkillsDB = require("../models/SkillsDB");

router.get('/', async (req, res) => {
    try {
        const teams = await Teams.find()
        const skills = await SkillsDB.aggregate([
            {
                $lookup: {
                    from: 'teams',
                    let: { skillName: '$name' },
                    pipeline: [
                        { $unwind: '$skills' },
                        { $match: { $expr: { $eq: ['$skills', '$$skillName'] } } },
                        { $group: { _id: '$skills', count: { $sum: 1 } } }
                    ],
                    as: 'count'
                }
            },
            {
                $addFields: {
                    count: { $ifNull: [{ $arrayElemAt: ['$count.count', 0] }, 0] }
                }
            }
        ])
        teams.forEach(team => {
            team.emptyCirclesArray = new Array(team.maxCountMembers - team.members.length).fill(0);
        });

        res.render('TeamSearch/teamSearch.hbs', {"skills-search": skills.filter(elem => elem["count"] !== 0), "teams": teams});
    } catch (err) {
        res.status(500).json({ message: "Server Error" });
    }
});


router.get('/:ideasId', async (req, res) => {
    try {
        // Get the ideasId from the request parameters
        const ideasId = req.params.ideasId;

        // Find all teams with the specified idea
        const teams = await Teams.find({ idea: ideasId });

        // Check if there are any teams
        if (teams.length === 0) {
            // If there are no teams, render a message saying that there are no teams
            res.render('noTeams.hbs');
        } else {
            // If there are teams, render the list of teams using Handlebars
            res.render('teamsList.hbs', { teams });
        }
    } catch (err) {
        res.status(500).json({ message: "Server Error" });
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

    if (!(2<=maxCountMembers && maxCountMembers<=10)) {
        res.status(400).json({"message":"wrong maxCountMembers"});
        return;
    }
    const team = new Teams({
        name: name,
        idea: idea_id,
        owner: username,
        description: description,
        skills: skills,
        members: [username],
        maxCountMembers: maxCountMembers
    });

    await team.save();
    await res.redirect('/ideas');

})

router.post('/create')
module.exports = router;