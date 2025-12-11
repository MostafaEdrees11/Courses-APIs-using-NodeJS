const express = require('express');
const {body, validationResult} = require('express-validator');

const app = express();
const portNum = 8080;

app.use(express.json())

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


// Create new course
const newCourseValidator = [
    body('title')
        .exists().withMessage('Course title is required.')
        .isString().withMessage('Course title must be string.')
        .contains('course').withMessage('Course title must end with (course) keyword.')
        .isLength({min: 8, max: 30}).withMessage('Course title must be between 8 and 30 characters.'),

    body("price")
        .exists().withMessage('Course price is required.')
        .isFloat({min: 0, max: 5000}).withMessage('Course price must be number & between 0 to 5000$.')
]
app.post('/api/courses', newCourseValidator, (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) return res.status(400).json({errors: errors.array()});

    const newCourse = req.body;
    newCourse.id = courses.length + 1;
    courses.push(newCourse);

    res.status(201).json({msg: "Course created successfully.", course: newCourse});
})

app.listen(portNum, () => {
    console.log(`Server connected on portNum: ${portNum}`);
})