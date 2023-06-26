const express = require('express');
const router = express.Router();
const Teams = require('../../models/TeamsDB');
const Users = require("../../models/UsersDB");
const { Types } = require('mongoose');
const path = require("path");


router.delete("/delete/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const team = await Teams.findById(id);
        const promise = team.members.map(async (member) => {
            const user = await Users.findOne({username: member});
            user.currentProjects = user.currentProjects.filter(teamId => teamId.toString() !== id);
            await user.save();
        });
        await Promise.all(promise);
        await Teams.findByIdAndDelete(id);

        res.status(200).json({ message: "Team deleted" });
    } catch (err) {
        res.status(500).json({ message: "Server Error" });
    }
});

router.put("/complete/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const team = await Teams.findById(id, { isActive: false });
        const promise = team.members.map(async (member) => {
            const user = await Users.findOne({username: member});
            user.currentProjects = user.currentProjects.filter(teamId => teamId.toString() !== id);
            user.finishedProjects.push(id);
            await user.save();
        });
        await Promise.all(promise);
        team.isActive = false;
        await team.save();

        res.status(200).json({ message: "Complete!" });
    } catch (err) {
        res.status(500).json({ message: "Server Error" });
    }
});

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
        if (!req.isAuthenticated()){
            await res.redirect(302, '/login');
            return;
        }
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

router.delete("/:teamId/leave", async (req, res) => {
    if (!req.isAuthenticated()){
        await res.redirect(302, '/login');
        return;
    }
    const teamId = req.params.teamId;
    const username = req.user.username;
    try {
        const team = await Teams.findById(teamId);
        if (!team) {
            return res.status(404).json({ message: 'Команда не найдена' });
        }
        team.members = team.members.filter(user => user !== username);

        const user = await Users.findOne({ username: username });
        user.currentProjects = user.currentProjects.filter(teamId => teamId.toString() !== teamId);
        await user.save();
        await team.save();
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }

});
router.delete('/:teamId/requests/accept/:username', async (req, res) => {
    try {
        const { teamId, username } = req.params;
        const team = await Teams.findById(teamId);
        if (!team) {
            return res.status(404).json({ message: 'Команда не найдена' });
        }
        team.applications = team.applications.filter(user => user !== username);
        if (team.members.includes(username)) {
            return res.status(400).json({ message: 'Пользователь уже в команде' });
        }

        if (team.members.length >= team.maxMembers) {
            return res.status(400).json({ message: 'Команда уже заполнена' });
        }
        team.members.push(username);
        const user = await Users.findOne({ username: username });
        user.currentProjects.push(teamId);
        await team.save();
        await user.save();
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.delete('/:teamId/requests/decline/:username', async (req, res) => {
    try {
        const { teamId, username } = req.params;
        const team = await Teams.findById(teamId);
        if (!team) {
            return res.status(404).json({ message: 'Команда не найдена' });
        }
        team.applications = team.applications.filter(user => user !== username);
        await team.save();
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/:teamId/requests', async (req, res) => {
    try {
        const teamId = req.params.teamId;


        const team = await Teams.findById(teamId);
        const requests = team.applications;
        const promises = await requests.map(async username => {
            return Users.findOne({ username: username });
        });
        const userInfos = await Promise.all(promises);
        if (requests.length === 0) {
            res.render('noRequests.hbs');
        }
        else {

            await res.render('requestsList.hbs', { requests: userInfos, teamId: teamId });
        }
    } catch (err) {
        res.status(500).json({ message: "Server Error" });
    }
});




module.exports = router;