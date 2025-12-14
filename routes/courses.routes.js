const express = require('express');

const router = express.Router();

const coursesController = require('../controllers/courses.controller');
const coursesMiddlewareValidations = require('../middlewares/courses.validationSchema');
const verifyJWTtokenMiddleware = require('../middlewares/verifyJWTtoken.middleware');

// Implement CRUD Operations (Create, Read, Update, Delete)
router.route('/')
        .get(coursesController.getAllCourses)
        .post(verifyJWTtokenMiddleware, coursesMiddlewareValidations.createCourseValidation(), coursesController.createCourse)

router.route('/:courseId')
        .get(coursesController.getCourse)
        .patch(verifyJWTtokenMiddleware, coursesMiddlewareValidations.updateCourseValidation(), coursesController.updateCourse)
        .delete(verifyJWTtokenMiddleware, coursesController.deleteCourse)


module.exports = {router};