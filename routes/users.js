const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Получение данных пользователя
router.get('/', async (req, res, next) => {
    try {
        const user = await User.findById(req.session.userId);
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.json(user);
    } catch (err) {
        next(err);
    }
});

// Обновление данных пользователя
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