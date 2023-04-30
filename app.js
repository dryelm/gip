const mongoose = require('mongoose').default;
const express = require('express');
const bodyParser = require('body-parser');

const userRoutes = require('./routes/users');
const projectRoutes = require('./routes/projects');


const app = express();
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

app.use('/api/users', userRoutes);

app.use('/api/projects', projectRoutes);
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
