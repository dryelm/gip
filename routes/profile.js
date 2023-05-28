const express = require('express');
const router = express.Router();
const User = require('../models/UsersDB');

router.get('/', async function (req, res) {
    if (req.isAuthenticated()){
        res.redirect('/profile/' + req.session.passport.user.username);
        return;
    }

    res.redirect('/login');
});

router.get('/:username', async function (req, res) {
    const username = req.params.username;
    const user = await User.findOne({username: username}, {password: 0});
    if (!user) {
        res.status(404).send('User not found');
        return;
    }
    res.json(user);
    // res.render('PersonalAccount/personalAccount', {user: user});
});

module.exports = router;

