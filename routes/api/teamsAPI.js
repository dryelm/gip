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

module.exports = router;