const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const projectsRouter = require('./routes/projects');
const usersRouter = require('./routes/users');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/projects', projectsRouter);
app.use('/api/users', usersRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
