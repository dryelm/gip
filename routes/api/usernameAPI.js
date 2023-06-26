const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    if (!req.isAuthenticated()){
        await res.status(401).json({message: "Unauthorized"});
        return;
    }

    await res.status(200).json({username: req.session.passport.user.username});
});
module.exports = router;