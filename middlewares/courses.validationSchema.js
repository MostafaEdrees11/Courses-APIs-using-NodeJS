const {body} = require('express-validator');

const createCourseValidation = () => {
    return [
        body('title')
            .exists().withMessage('Course title is required.')
            .isString().withMessage('Course title must be string.')
            .contains('course').withMessage('Course title must end with (course) keyword.')
            .isLength({min: 8, max: 30}).withMessage('Course title must be between 8 and 30 characters.'),

        body("price")
            .exists().withMessage('Course price is required.')
            .isFloat({min: 0, max: 5000}).withMessage('Course price must be number & between 0 to 5000$.')
    ];
}

const updateCourseValidation = () => {
    return [
        body('title')
            .optional()
            .isString().withMessage('Course title must be string.')
            .contains('course').withMessage('Course title must end with (course) keyword.')
            .isLength({min: 8, max: 30}).withMessage('Course title must be between 8 and 30 characters.'),

        body('price')
            .optional()
            .isFloat({min: 0, max: 5000}).withMessage('Course price must be number & between 0 to 5000$.')
    ];
}


module.exports = {createCourseValidation, updateCourseValidation};