const express = require('express');
const router = express.Router();
const Teams = require('../../models/TeamsDB');
const Ideas = require("../../models/IdeasDB");
const { Types } = require('mongoose');


router.get('/', async (req, res) => {
    const teams = await Teams.find();
    await res.json(teams);
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const team = await Teams.aggregate([
            {
                $match: {
                    _id: new Types.ObjectId(id)
                }
            },
            {
                $lookup: {
                    from: 'ideas',
                    localField: 'idea',
                    foreignField: '_id',
                    as: 'idea'
                }
            },
            {
                $addFields: {
                    ideaDescription: { $arrayElemAt: ['$idea.description', 0] }
                }
            },
            {
                $project: {
                    idea: 0
                }
            }
        ]);
        await res.json(team[0]);

    }
    catch(err) {
        res.status(500).json({ message: "Server Error" });
    }


});

router.put('/:teamId', async (req, res) => {
    try {
        const teamId = req.params.teamId;
        const username = req.user.username;
        const team = await Teams.findById(teamId);
        if (!team) {
            return res.status(404).json({ message: 'Команда не найдена' });
        }
        if (!team.applications.includes(username)) {
            team.applications.push(username);
            await team.save();
        }
        res.json({ message: 'Заявка успешно отправлена' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.delete('/:teamId/:username', async (req, res) => {
    try {
        const { teamId, username } = req.params;
        const team = await Team.findById(teamId);
        if (!team) {
            return res.status(404).json({ message: 'Команда не найдена' });
        }
        team.applications = team.applications.filter(user => user !== username);
        await team.save();
        res.json({ message: 'Заявка успешно удалена' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});



module.exports = router;