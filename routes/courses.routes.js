const express = require('express');

const router = express.Router();

const coursesController = require('../controllers/courses.controller');
const coursesMiddlewareValidations = require('../middlewares/courses.validationSchema');

// Implement CRUD Operations (Create, Read, Update, Delete)
router.route('/')
        .get(coursesController.getAllCourses)
        .post(coursesMiddlewareValidations.createCourseValidation(), coursesController.createCourse)

router.route('/:courseId')
        .get(coursesController.getCourse)
        .patch(coursesMiddlewareValidations.updateCourseValidation(), coursesController.updateCourse)
        .delete(coursesController.deleteCourse)


module.exports = {router};