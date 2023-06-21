const express = require('express');
const router = express.Router();
const Project = require('../models/IdeasDB');
const path = require("path");
const Skills = require("../models/SkillsDB");
const Ideas = require("../models/IdeasDB");
const SkillsDB = require("../models/SkillsDB");

// Получение списка проектов
router.get('/', async (req, res) => {
    try {
        const ideas = await Ideas.find({public : true}, {public: 0});
        const skills = await SkillsDB.aggregate([
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
        ]);

        await res.render("IdeaSearch/ideaSearch.hbs", {"ideas":ideas, "skills-search":skills});
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Создание нового проекта
router.post('/', async (req, res) => {
    const project = new Ideas({
        name: req.body.name,
        description: req.body.description,
        skills: req.body.skills
    });

    try {
        const newProject = await project.save();
        res.status(201).json(newProject);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.get("/create", async (req, res) => {
    if (!req.isAuthenticated()){
        await res.status(401).json({message: "Unauthorized"});
        return;
    }
    const skills = await SkillsDB.aggregate([
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
    ]);

    await res.render('CreateIdea/createIdea.hbs', {skills});
});

router.post('/create', async (req, res) =>
{
    const username = req.session.passport.user.username;
    if (!req.isAuthenticated()){
        await res.status(401).json({message: "Unauthorized"});
        return;
    }

    const name = req.body.name;
    const description = req.body.description;
    const skills = req.body.skills;

    if (!name || !description || !skills) {
        await res.status(400).json({message: "Bad request"});
        return;
    }

    if (!(typeof name === 'string' && typeof description === 'string' && Array.isArray(skills) && skills.every(skill => typeof skill === 'string'))){
        await res.status(400).json({message: "Bad request"});
        return;
    }

    if (skills.some(skill => Skills.findOne({name: skill}) === null)){
        await res.status(400).json({message: "Bad request"});
        return;
    }

    const idea = new Ideas({
        name : name,
        description : description,
        skills : skills,
        creator : username,
        public : false
    });

    await idea.save();
    await res.redirect("/ideas");

});


// Получение информации о проекте по ID
router.get('/id/:id', getProject, (req, res) => {
    res.json(res.project);
});

// Обновление информации о проекте по ID
router.patch('/id/:id', getProject, async (req, res) => {
    if (req.body.name != null) {
        res.project.name = req.body.name;
    }

    if (req.body.description != null) {
        res.project.description = req.body.description;
    }

    if (req.body.skills != null) {
        res.project.skills = req.body.skills;
    }

    try {
        const updatedProject = await res.project.save();
        res.json(updatedProject);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Удаление проекта по ID
router.delete('/id/:id', getProject, async (req, res) => {
    try {
        await res.project.remove();
        res.json({ message: 'Project deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


// Middleware для получения информации о проекте по ID
async function getProject(req, res, next) {
    let project;
    try {
        project = await Project.findById(req.params.id);
        if (project == null) {
            return res.status(404).json({ message: 'Project not found' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.project = project;
    next();
}

module.exports = router;