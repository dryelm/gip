const express = require('express');
const router = express.Router();
const passport = require('passport');
const path = require('path');


router.get('/', async function (req, res) {
    const error = req.query.error;
    if (req.isAuthenticated()){
        res.redirect('/');
        return;
    }
    if (error === 'user_not_found') {
        res.render('login.hbs', {error: 'Пользователь не найден'});
        return;
    }

    res.render('login.hbs');
});

router.post('/', async function (req, res) {
    passport.authenticate('local', {failureRedirect: '/login'}, (err, user, info) => {
        if (err) { return next(err); }
        if (!user) { return res.redirect('/login?error=user_not_found'); }
        const returnTo = req.session.returnTo || '/'
        req.logIn(user, function(err) {
            if (err) { return next(err); }
            delete req.session.returnTo;
            res.redirect(returnTo);
        });
    })(req, res);
});



module.exports = router;