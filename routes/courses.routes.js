const express = require('express');

const router = express.Router();

const coursesController = require('../controllers/courses.controller');
const coursesMiddlewareValidations = require('../middlewares/courses.validationSchema');
const verifyJWTtokenMiddleware = require('../middlewares/verifyJWTtoken.middleware');
const allowedToMiddleware = require("../middlewares/allowedTo.middleware");

const userRoles = require("../utils/userRoles");

// Implement CRUD Operations (Create, Read, Update, Delete)
router.route('/')
        .get(coursesController.getAllCourses)
        .post(verifyJWTtokenMiddleware, allowedToMiddleware(userRoles.MANAGER), coursesMiddlewareValidations.createCourseValidation(), coursesController.createCourse)

router.route('/:courseId')
        .get(coursesController.getCourse)
        .patch(verifyJWTtokenMiddleware, allowedToMiddleware(userRoles.ADMIN, userRoles.MANAGER), coursesMiddlewareValidations.updateCourseValidation(), coursesController.updateCourse)
        .delete(verifyJWTtokenMiddleware, allowedToMiddleware(userRoles.ADMIN, userRoles.MANAGER), coursesController.deleteCourse)


module.exports = {router};