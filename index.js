const express = require('express');

const app = express();
const portNum = 8080;


app.listen(portNum, () => {
    console.log(`Server connected on portNum: ${portNum}`);
})