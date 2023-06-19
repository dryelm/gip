const express = require('express');
const router = express.Router();
const SkillsDB = require('../../models/SkillsDB');

router.get("/", async (req, res) => {
    await SkillsDB.aggregate([
        {
            $lookup: {
                from: 'ideas',
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
    ]).then(skills => res.json(skills));
});

router.get("/teamsSkills", async (req, res) => {
    await SkillsDB.aggregate([
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
    ]).then(skills => res.json(skills));
});

module.exports = router;
