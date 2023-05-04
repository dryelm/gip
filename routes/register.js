const express = require('express');
const path = require("path");
const router = express.Router();
const User = require('../models/User');
const {hashPassword: hashPassword} = require('../hashing');

router.get('/', (req, res) => {
    if (req.isAuthenticated()){
        res.redirect('/');
        return;
    }

    res.sendFile(path.join(`${__dirname}`, '..', 'views', 'register.html'));
})

router.post('/', async (req, res) => {
    const username = req.body.username;
    const email = req.body.email
    const password = req.body.password;

    // Шифрование пароля
    const hashedPassword = await hashPassword(password);

    // Добавление нового пользователя в базу данных
    try {
        const user = new User({ username: username, email: email, password: hashedPassword });
        await user.save();
        res.redirect('/');
    } catch (err) {
        // Обработка ошибок при добавлении пользователя в базу данных
        console.error(err);
        res.redirect('/register');
    }
});

module.exports = router;