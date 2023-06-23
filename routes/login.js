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

router.post('/', async function (req, res) {
    passport.authenticate('local', {failureRedirect: '/login'}, (err, user, info) => {
        if (err) { return next(err); }
        if (!user) { return res.redirect('/login'); }
        const returnTo = req.session.returnTo || '/'
        req.logIn(user, function(err) {
            if (err) { return next(err); }
            delete req.session.returnTo;
            res.redirect(returnTo);
        });
    })(req, res);
});

module.exports = router;