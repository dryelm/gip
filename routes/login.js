const express = require('express');
const router = express.Router();
const passport = require('passport');
const path = require('path');


router.get('/', async function (req, res) {
    if (req.isAuthenticated()){
        res.redirect('/');
        return;
    }


    res.sendFile(path.join(`${__dirname}`, '..', 'views', 'login.html'));
});

router.post('/',
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login' }));

module.exports = router;