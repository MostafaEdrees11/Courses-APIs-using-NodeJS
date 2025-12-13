const {validationResult} = require('express-validator');

const courseModle = require('../models/course.model');

const httpStatusText = require('../utils/httpStatusText');

const getAllCourses = async (req, res) => {
    const limit = +req.query.limit || 6;
    const page = +req.query.page || 1;
    const skip = (page - 1) * limit;
    const courses = await courseModle.find({}, {__v: false}).limit(limit).skip(skip);
    
    res.status(200).json({
        status: httpStatusText.SUCCESS,
        data: { courses }
    });
};

const getCourse = async (req, res) => {
    try {
        const course = await courseModle.findById(req.params.courseId, {__v: false});    
        if(!course) {
            return res.status(404).json({
                status: httpStatusText.FAIL,
                data: { course: null }
            });
        }

        res.status(200).json({
            status: httpStatusText.SUCCESS,
            data: { course }
        });
    } catch(error) {
        return res.status(400).json({
            status: httpStatusText.ERROR,
            message: error.message
        })
    }
};

const createCourse = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({
            status: httpStatusText.FAIL,
            data: { errors: errors.array() }
        });
    }

    const newCourse = new courseModle(req.body);
    await newCourse.save();

    res.status(201).json({
        status: httpStatusText.SUCCESS,
        data: {course: newCourse}
    });
};

const updateCourse = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({
            status: httpStatusText.FAIL,
            data: { errors: errors.array() }
        });
    }

    if(!req.body.title && !req.body.price) {
        return res.status(400).json({
            status: httpStatusText.FAIL,
            data: { error: "You don't provide any data." }
        });
    }
    
    try {
        let course = await courseModle.findById(req.params.courseId);
        if(!course) {
            return res.status(404).json({
                status: httpStatusText.FAIL,
                data: { course: null }
            });
        }

        const updatedCourse = await course.updateOne({$set: {...req.body}});
        res.status(202).json({
            status: httpStatusText.SUCCESS,
            data: null
        });
    } catch (error) {
        return res.status(400).json({
            status: httpStatusText.ERROR,
            message: error.message
        })
    }
};

const deleteCourse = async (req, res) => {
    try {
        const course = await courseModle.findById(req.params.courseId);
        if(!course) {
            return res.status(404).json({
                status: httpStatusText.FAIL,
                data: { course: null }
            });
        }

        await course.deleteOne();
        res.status(202).json({
            status: httpStatusText.SUCCESS,
            data: null
        });
    } catch(error) {
        return res.status(400).json({
            status: httpStatusText.ERROR,
            message: error.message
        })
    }
};


module.exports = {
    getAllCourses,
    getCourse,
    createCourse,
    updateCourse,
    deleteCourse
}