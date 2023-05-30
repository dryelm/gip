const express = require('express');
const router = express.Router();
const Users = require('../../models/UsersDB');

router.get('/:username', async (req, res) => {
    const username = req.params.username;
    const project = await Users.findOne({username: username}, {password: 0});
    await res.json(project);
});

module.exports = router;