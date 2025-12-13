const {validationResult} = require('express-validator');

const courseModle = require('../models/course.model');

const httpStatusText = require('../utils/httpStatusText');
const AppError = require('../utils/appError');

const asyncWrapper = require('../middlewares/asyncWrapper.middleware');

const getAllCourses = asyncWrapper(
    async (req, res) => {
        const limit = +req.query.limit || 6;
        const page = +req.query.page || 1;
        const skip = (page - 1) * limit;
        const courses = await courseModle.find({}, {__v: false}).limit(limit).skip(skip);

        res.status(200).json({
            status: httpStatusText.SUCCESS,
            data: { courses }
        });
    }
)

const getCourse = asyncWrapper(
    async (req, res, next) => {
        const course = await courseModle.findById(req.params.courseId, {__v: false});
        if(!course) {
            AppError.create('Course not found', 404, httpStatusText.FAIL);
            return next(AppError);
        }

        res.status(200).json({
            status: httpStatusText.SUCCESS,
            data: { course }
        });
    }
);

const createCourse = asyncWrapper(
    async (req, res, next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            AppError.create(errors.array(), 400, httpStatusText.FAIL);
            return next(AppError);
        }

        const newCourse = new courseModle(req.body);
        await newCourse.save();

        res.status(201).json({
            status: httpStatusText.SUCCESS,
            data: {course: newCourse}
        });
    }
);

const updateCourse = asyncWrapper(
    async (req, res, next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            AppError.create(errors.array(), 400, httpStatusText.FAIL);
            return next(AppError);
        }

        if(!req.body.title && !req.body.price) {
            AppError.create("You don't provide any data.", 400, httpStatusText.FAIL);
            return next(AppError);
        }

        let course = await courseModle.findById(req.params.courseId);
        if(!course) {
            AppError.create('Course not found', 404, httpStatusText.FAIL);
            return next(AppError);
        }

        await course.updateOne({$set: {...req.body}});
        res.status(202).json({
            status: httpStatusText.SUCCESS,
            data: null
        });
    }
);

const deleteCourse = asyncWrapper(
    async (req, res, next) => {
        const course = await courseModle.findById(req.params.courseId);
        if(!course) {
            AppError.create('Course not found', 404, httpStatusText.FAIL);
            return next(AppError);
        }

        await course.deleteOne();
        res.status(202).json({
            status: httpStatusText.SUCCESS,
            data: null
        });
    }
);


module.exports = {
    getAllCourses,
    getCourse,
    createCourse,
    updateCourse,
    deleteCourse
}