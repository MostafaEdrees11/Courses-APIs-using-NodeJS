let {courses} = require('../data/courses');

const getAllCourses = (req, res) => {
    res.status(200).json(courses);
};


const getCourse = (req, res) => {
    const courseId = +req.params.courseId;
    const course = courses.find((course) => course.id === courseId);
    
    if(!course) return res.status(404).json({msg: "Course not found."});

    res.status(200).json(course);
};


const createCourse = (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) return res.status(400).json({errors: errors.array()});

    const newCourse = req.body;
    newCourse.id = courses.length + 1;
    courses.push(newCourse);

    res.status(201).json({msg: "Course created successfully.", course: newCourse});
};


const updateCourse = (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) return res.status(400).json({errors: errors.array()});

    if(!req.body.title && !req.body.price) return res.status(400).json({msg: "You don't provide any data."});
    
    const courseId = +req.params.courseId;
    let courseIndex = courses.findIndex((course) => course.id === courseId);

    if(courseIndex === -1) return res.status(404).json({msg: "Course not found."});

    courses[courseIndex] = {...courses[courseIndex], ...req.body};
    res.status(202).json({msg: "Course updated successfully.", course: courses[courseIndex]});
};


const deleteCourse = (req, res) => {
    const courseId = +req.params.courseId;
    let courseIndex = courses.findIndex((course) => course.id === courseId);

    if(courseIndex === -1) return res.status(404).json({msg: "Course not found."});

    courses.splice(courseIndex, 1);
    res.status(202).json({msg: "Course deleted successfully."});
};


module.exports = {
    getAllCourses,
    getCourse,
    createCourse,
    updateCourse,
    deleteCourse
}