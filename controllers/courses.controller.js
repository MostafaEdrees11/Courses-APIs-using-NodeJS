const {validationResult} = require('express-validator');

const courseModle = require('../models/course.model');

const getAllCourses = async (req, res) => {
    const courses = await courseModle.find();
    res.status(200).json(courses);
};

const getCourse = async (req, res) => {
    try {
        const course = await courseModle.findById(req.params.courseId);    
        if(!course) return res.status(404).json({msg: "Course not found."});

        res.status(200).json(course);
    } catch(error) {
        return res.status(404).json({msg: "Invalid ObjectId."});
    }
};

const createCourse = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) return res.status(400).json({errors: errors.array()});

    const newCourse = new courseModle(req.body);
    await newCourse.save();

    res.status(201).json({msg: "Course created successfully.", course: newCourse});
};

const updateCourse = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) return res.status(400).json({errors: errors.array()});

    if(!req.body.title && !req.body.price) return res.status(400).json({msg: "You don't provide any data."});
    
    try {
        let course = await courseModle.findById(req.params.courseId);
        if(!course) return res.status(404).json({msg: "Course not found."});

        await course.updateOne({$set: {...req.body}});
        res.status(202).json({msg: "Course updated successfully."});
    } catch (error) {
        return res.status(400).json({msg: "Invalid ObjectId."});
    }
};

const deleteCourse = async (req, res) => {
    try {
        const course = await courseModle.findById(req.params.courseId);
        if(!course) return res.status(404).json({msg: "Course not found."});

        await course.deleteOne();
        res.status(202).json({msg: "Course deleted successfully."});
    } catch(error) {
        return res.status(400).json({msg: "Invalid ObjectId."});
    }
};


module.exports = {
    getAllCourses,
    getCourse,
    createCourse,
    updateCourse,
    deleteCourse
}