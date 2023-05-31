const express = require('express');
const path = require("path");
const router = express.Router();
const UsersDB = require('../models/UsersDB');
const {hashPassword: hashPassword} = require('../hashing');
const passport = require("passport");

router.get('/', async (req, res) => {
    if (await req.isAuthenticated()){
        res.redirect('/');
        return;
    }

    await res.sendFile(path.join(`${__dirname}`, '..', 'views', 'register.html'));
})

router.post('/', async (req, res) => {
    const username = req.body.username;
    const email = req.body.email
    const password = req.body.password;

    // Шифрование пароля
    const hashedPassword = await hashPassword(password);

    // проверка на валидность данных
    if (!username || !email || !password) {
        await res.redirect('/register');
        return;
    }

    if ((username.length < 4 || username.length > 20) || !(/^[a-zA-Z0-9]+$/.test(username))) {
        await res.redirect('/register');
        return;
    }

    if (password.length < 4 || password.length > 20) {
        await res.redirect('/register');
        return;
    }


    // Добавление нового пользователя в базу данных
    try {
        const isExist = await UsersDB.findOne({$or: [{username: username}, {email: email}]});
        if (isExist) {
            res.redirect('/register');
            return;
        }
        const user = new UsersDB({ username: username, email: email, password: hashedPassword });
        await user.save();


    } catch (err) {
        // Обработка ошибок при добавлении пользователя в базу данных
        console.error(err);
        await res.redirect('/');
    }

    await req.login( {username, hashedPassword}, function(err) {
        if (err) { return res.redirect('/login'); }
        return res.redirect('/');
    });

});

module.exports = router;