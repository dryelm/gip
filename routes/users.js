const express = require('express');
const router = express.Router();
const User = require('../models/UsersDB');



router.get('/', async (req, res, next) => {
    try {
        const user = await User.findOne({username: req.session.passport.user.username}, {password: 0});
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.json(user);
    } catch (err) {
        next(err);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const user = await User.findById(req.session.userId);
        if (!user) {
            return res.status(404).send('User not found');
        }
        user.name = req.body.name;
        user.email = req.body.email;
        user.skills = req.body.skills.split(',').map(skill => skill.trim());
        await user.save();
        res.redirect('/profile');
    } catch (err) {
        next(err);
    }
});

module.exports = router;