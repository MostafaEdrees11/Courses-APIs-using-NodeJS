const express = require('express');

const app = express();
const portNum = 8080;

const coursesRouter = require('./routes/courses.routes');

app.use(express.json());

app.use('/api/courses', coursesRouter.router);

app.listen(portNum, () => {
    console.log(`Server connected on portNum: ${portNum}`);
})