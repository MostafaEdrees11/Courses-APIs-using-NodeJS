const express = require('express');
const mongoose = require('mongoose');

const app = express();
const portNum = 8080;

const url = 'mongodb+srv://mostafaedrees11:nodejs%2Amongodb%23@learn-mongo-db.hk4scg8.mongodb.net/simple-nodejs-project?appName=learn-mongo-db';
mongoose.connect(url).then(() => {
    console.log("Connected to DB Server Successfully.");
});

const coursesRouter = require('./routes/courses.routes');

app.use(express.json());

app.use('/api/courses', coursesRouter.router);

app.listen(portNum, () => {
    console.log(`Server connected on portNum: ${portNum}`);
})