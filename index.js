const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');

const notFoundMiddleware = require('./middlewares/notFound.middleware');

const app = express();
const portNum = process.env.PORTNUMBER || 8011;

const url = process.env.MONGODB_URL;
mongoose.connect(url).then(() => {
    console.log("Connected to DB Server Successfully.");
});

app.use(cors());

const coursesRouter = require('./routes/courses.routes');

app.use(express.json());

app.use('/api/courses', coursesRouter.router);

// handle the requests that don't match any route
app.use(notFoundMiddleware);

app.listen(portNum, () => {
    console.log(`Server connected on portNum: ${portNum}`);
})