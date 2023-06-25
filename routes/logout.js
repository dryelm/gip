const express = require('express');
const router = express.Router();
const passport = require('passport');


router.post('/', async function (req, res) {
    await req.logout(function(err) {
        if (err) {
            return res.status(500).json({ status: 'Logout failed!' });
        }
        return res.status(200).json({ status: 'Logout successful!' });
    });
});

module.exports = router;