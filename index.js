const express = require('express');
const {body, validationResult} = require('express-validator');

const app = express();
const portNum = 8080;

const coursesController = require('./controllers/courses.controller');

app.use(express.json())

// Implement CRUD Operations (Create, Read, Update, Delete)

app.get('/api/courses', coursesController.getAllCourses)


app.get('/api/courses/:courseId', coursesController.getCourse)


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
app.post('/api/courses', newCourseValidator, coursesController.createCourse)


const updateCourseValidator = [
    body('title')
        .optional()
        .isString().withMessage('Course title must be string.')
        .contains('course').withMessage('Course title must end with (course) keyword.')
        .isLength({min: 8, max: 30}).withMessage('Course title must be between 8 and 30 characters.'),

    body('price')
        .optional()
        .isFloat({min: 0, max: 5000}).withMessage('Course price must be number & between 0 to 5000$.')
]
app.patch('/api/courses/:courseId', updateCourseValidator, coursesController.updateCourse)


app.delete('/api/courses/:courseId', coursesController.deleteCourse)

app.listen(portNum, () => {
    console.log(`Server connected on portNum: ${portNum}`);
})