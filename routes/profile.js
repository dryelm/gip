const express = require('express');
const router = express.Router();
const User = require('../models/UsersDB');
const Teams = require("../models/TeamsDB")
const path = require("path");

router.get('/', async function (req, res) {
    if (req.isAuthenticated()){

        await res.redirect('/profile/user/' + req.session.passport.user.username);
        return;
    }
    req.session.returnTo = '/profile';
    res.redirect('/login');
});

router.get('/user/:username', async function (req, res) {
    const username = req.params.username;

    const user = await User.findOne({username: username}, {password: 0});

    if (!user) {
        await res.status(404).send('User not found');
        return;
    }

    const promisesCurr = user.currentProjects.map(proj => Teams.findById(proj));
    user.currentProjects = await Promise.all(promisesCurr);

    const promisesFinished =  user.finishedProjects.map(proj => Teams.findById(proj));
    user.finishedProjects = await Promise.all(promisesFinished);
    if (req.isAuthenticated() && req.session.passport.user.username === username) {
        await res.render("PersonalAccount/myPersonalAccount.hbs", user);
    }
    else {
        await res.render('PersonalAccount/otherPersonalAccount.hbs', user);
    }

});

router.get('/edit', async function (req, res) {
    res.sendFile(path.join(`${__dirname}`, '..', 'views', 'editProfile', 'editProfile.html'));
});

router.get('/edit/skills', async function (req, res) {
     if (!req.isAuthenticated()){
         req.session.returnTo = req.originalUrl;
         res.redirect('/login');
         return;
     }
    res.sendFile(path.join(`${__dirname}`, '..', 'views', 'editProfile', 'editSkills.html'));
});
module.exports = router;

