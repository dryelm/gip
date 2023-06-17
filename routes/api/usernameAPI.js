const express = require('express');
const router = express.Router();
const passport = require('passport');

// Получение имени пользователя из сессии
router.get('/', async (req, res) => {
    if (!req.isAuthenticated()){
        await res.status(401).json({message: "Unauthorized"});
        return;
    }

    await res.json({username: req.session.passport.user.username});
});
module.exports = router;