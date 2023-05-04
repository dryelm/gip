const mongoose = require('mongoose').default;
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const app = express();
const session = require('express-session');
const crypto = require('crypto');
const { comparePasswords } = require("./hashing");
const User = require('./models/User');
const userRoutes = require('./routes/users');
const projectRoutes = require('./routes/projects');
const loginRoutes = require('./routes/login');
const registerRoutes = require('./routes/register');

const secret = crypto.randomBytes(64).toString('hex');
app.use(session({
    secret: secret,
    resave: false,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(
    async function(username, password, done) {
        try {
            const user = await User.findOne({ username: username });
            if (user && await comparePasswords(password, user.password)) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        } catch (err) {
            return done(err);
        }
    }
));
passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});


const PORT = process.env.PORT || 3000;
const DB_URI = process.env.DB_URI || 'mongodb://127.0.0.1:27017/gipdb';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
mongoose.connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Database connected!'))
    .catch((err) => console.log(err));

app.use('/users', userRoutes);
app.use('/login', loginRoutes);
app.use('/projects', projectRoutes);
app.use('/register', registerRoutes);



app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: err
    });
});

app.get('/', (req, res) => {
    res.render('index');
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}...`);
});


