const express = require('express');
const path = require("path");
const router = express.Router();
const UsersDB = require('../models/UsersDB');
const {hashPassword: hashPassword} = require('../hashing');
const passport = require("passport");

router.get('/', async (req, res) => {
    const error = req.query.error;
    if (await req.isAuthenticated()){
        res.redirect('/');
        return;
    }
    let errorText = "";
    switch (error) {
        case "empty_data":
            errorText = "Заполните все поля";
            break;
        case "incorrect_username":
            errorText = "Некорректное имя пользователя";
            break;
        case "incorrect_password":
            errorText = "Некорректный пароль";
            break;
        case "incorrect_email":
            errorText = "Некорректный email";
            break;
        case "user_exist":
            errorText = "Пользователь с таким именем или email уже существует";
            break;
        default:
            errorText = "";
    }
    await res.render('register.hbs', {error: errorText});
})

router.post('/', async (req, res) => {
    const username = req.body.username;
    const email = req.body.email
    const password = req.body.password;

    // Шифрование пароля
    const hashedPassword = await hashPassword(password);

    // проверка на валидность данных
    if (!username || !email || !password) {
        await res.redirect('/register?error=empty_data');
        return;
    }

    if ((username.length < 4 || username.length > 20) || !(/^[a-zA-Z0-9]+$/.test(username))) {
        await res.redirect( '/register?error=incorrect_username');
        return;
    }

    if (password.length < 4 || password.length > 20) {
        await res.redirect('/register?error=incorrect_password');
        return;
    }

    if (!(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+$/.test(email))) {
        await res.redirect( '/register?error=incorrect_email');
        return;
    }

    // Добавление нового пользователя в базу данных
    try {
        const isExist = await UsersDB.findOne({$or: [{username: username}, {email: email}]});
        if (isExist) {
            res.redirect(403, '/register?error=user_exist');
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