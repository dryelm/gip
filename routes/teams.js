const express = require('express');
const path = require("path");
const router = express.Router();
const Teams = require('../models/TeamsDB');
const Ideas = require("../models/IdeasDB");
const Users = require("../models/UsersDB")


router.get('/', async (req, res) => {
    try {
        let teams = await Teams.find();
        if(req.isAuthenticated()){
            teams = teams.filter(team => !team.members.includes(req.user.username));
        }

        teams.forEach(team => {
            team.emptyCirclesArray = new Array(team.maxCountMembers - team.members.length).fill(0);
        });
        if(!req.isAuthenticated()) {
            teams.forEach(team => {
                team.maySendApplication  = true;
            });
        }
        else {
            teams.forEach(team => {
                team.maySendApplication  = !(team.applications.includes(req.user.username));
            });
        }
        const skills = teams.map(team => team.skills).flat();

        const skillCounts = skills.reduce((acc, skill) => {
            const existingSkill = acc.find(s => s.name === skill);
            if (existingSkill) {
                existingSkill.count++;
            } else {
                acc.push({ name: skill, count: 1 });
            }
            return acc;
        }, []);


        res.render('TeamSearch/teamSearch.hbs', {
            "skills-search": skillCounts,
            "teams": teams.filter(team => team.isActive),
            "isAuthenticated": req.isAuthenticated()}
        );
    } catch (err) {
        res.status(500).json({ message: "Server Error" });
    }
});


router.get('/:ideasId', async (req, res) => {
    if (!req.isAuthenticated()){
        await res.status(401).json({message: "Unauthorized"});
        return;
    }
    try {
        const ideasId = req.params.ideasId;
        let teams = await Teams.find({ idea: ideasId});
        teams = teams.filter(team => !team.members.includes(req.user.username));
        teams = teams.filter(team => team.isActive);
        if(teams.length === 0){
            res.render('noTeams.hbs');
            return;
        }
        teams.forEach(team => {
            team.emptyCirclesArray = new Array(team.maxCountMembers - team.members.length).fill(0);
        });
        teams.forEach(team => {
            team.maySendApplication  = !(team.applications.includes(req.user.username));
        });
        res.render('teamsList.hbs', { teams });

    } catch (err) {
        res.render('noTeams.hbs');
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

    await team.save().then(async function(obj){
        const user = await Users.findOne({username: username});
        user.currentProjects.push(obj._id)
        await user.save();
    });

    await res.redirect('/ideas');

})

router.post('/create')
module.exports = router;