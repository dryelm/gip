const express = require('express');
const router = express.Router();

const Project = require('../models/IdeasDB');
const path = require("path");

// Получение списка проектов
router.get('/', async (req, res) => {
    try {
        res.sendFile(path.join(`${__dirname}`, '..', 'views', 'IdeaSearch', 'ideaSearch.html'));
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Создание нового проекта
router.post('/', async (req, res) => {
    const project = new Project({
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

// Получение информации о проекте по ID
router.get('/:id', getProject, (req, res) => {
    res.json(res.project);
});

// Обновление информации о проекте по ID
router.patch('/:id', getProject, async (req, res) => {
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
router.delete('/:id', getProject, async (req, res) => {
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