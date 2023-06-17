const express = require('express');
const router = express.Router();
const Users = require('../../models/UsersDB');
const Skills = require('../../models/SkillsDB');

router.get('/:username', async (req, res) => {
    const username = req.params.username;
    const user = await Users.findOne({username: username}, {password: 0});
    await res.json(user);
});

router.put('/:username', async (req, res) => {
    const username = req.params.username;
    if (req.session.passport.user.username !== username) {
        await res.status(401).json({message: "Unauthorized"});
        return;
    }

    try {
        const user = await Users.findOne({ username: username });
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        // Обновление информации о пользователе
        user.email = req.body.email || user.email;
        user.telegram = req.body.telegram || user.telegram;
        user.about = req.body.about || user.about;

        // Обновление навыков пользователя
        if (req.body.skills) {
            const skills = await Promise.all(req.body.skills.map(skill => Skills.findOne({ name: skill })));
            if (skills.every(skill => skill)) {
                user.skills = req.body.skills;
            } else {
                res.status(404).json({ message: 'Skill not found' });
                return;
            }
        }
        await user.save();


        res.status(200).json({ message: 'User updated successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


module.exports = router;