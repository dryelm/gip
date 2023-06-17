const express = require('express');
const router = express.Router();
const User = require('../models/UsersDB');
const path = require("path");

router.get('/', async function (req, res) {
    if (req.isAuthenticated()){
        res.redirect('/profile/user/' + req.session.passport.user.username);
        return;
    }

    res.redirect('/login');
});

router.get('/user/:username', async function (req, res) {
    const username = req.params.username;
    const user = await User.findOne({username: username}, {password: 0});
    if (!user) {
        res.status(404).send('User not found');
        return;
    }
    res.sendFile(path.join(`${__dirname}`, '..', 'views', 'PersonalAccount', 'personalAccount.html'));
    // res.render('PersonalAccount/personalAccount', {user: user});
});

router.get('/edit/skills', async function (req, res) {
     if (!req.isAuthenticated()){
         res.redirect('/login');
         return;
     }
    res.sendFile(path.join(`${__dirname}`, '..', 'views', 'editProfile', 'editSkills.html'));
});
module.exports = router;

