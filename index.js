const express = require('express');

const app = express();
const portNum = 8080;

const courses = [
    {
        id: 1,
        title: "HTML5 course",
        price: 500
    },
    {
        id: 2,
        title: "JS course",
        price: 800
    },
    {
        id: 3,
        title: "Node JS course",
        price: 1000
    },
    {
        id: 4,
        title: "React JS course",
        price: 2000
    },
]

// Implement CRUD Operations (Create, Read, Update, Delete)

// Get all courses
app.get('/api/courses', (req, res) => {
    res.status(200).json(courses);
})


// Get specific course using courseId
app.get('/api/courses/:courseId', (req, res) => {
    const courseId = +req.params.courseId;
    const course = courses.find((course) => course.id === courseId);
    
    if(!course) return res.status(404).json({msg: "Course not found."});

    res.status(200).json(course);
})

app.listen(portNum, () => {
    console.log(`Server connected on portNum: ${portNum}`);
})