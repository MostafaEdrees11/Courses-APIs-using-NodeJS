const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const path = require('path');

const notFoundMiddleware = require('./middlewares/notFound.middleware');
const errorMiddleware = require('./middlewares/error.middleware');

const app = express();
const portNum = process.env.PORTNUMBER || 8011;

app.use('/api/uploads', express.static(path.join(__dirname, 'uploads', 'profileImages')));

const url = process.env.MONGODB_URL;
mongoose.connect(url).then(() => {
    console.log("Connected to DB Server Successfully.");
});

app.use(cors());

const coursesRouter = require('./routes/courses.routes');
const usersRouter = require('./routes/users.routes');
const authRouter = require('./routes/auth.routes');

app.use(express.json());

app.use('/api/courses', coursesRouter.router);
app.use('/api/users', usersRouter.router);
app.use('/api/auth', authRouter.router);

// global middleware to handle the requests that don't match any route
app.use(notFoundMiddleware);

// global error handler
app.use(errorMiddleware);

app.listen(portNum, () => {
    console.log(`Server connected on portNum: ${portNum}`);
})