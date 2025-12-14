const {body} = require('express-validator');

const createUserValidation = () => {
    return [
        body('firstName')
            .exists().withMessage('firstName is required.')
            .isString().withMessage('firstName must be string.')
            .matches(/^[a-zA-Z]+$/).withMessage('firstName must consist of letters only a-z & A-Z')
            .isLength({min: 3, max: 25}).withMessage('firstName must be between 3 and 25 characters.'),

        body('lastName')
            .exists().withMessage('lastName is required.')
            .isString().withMessage('lastName must be string.')
            .matches(/^[a-zA-Z]+$/).withMessage('lastName must consist of letters only a-z & A-Z')
            .isLength({min: 3, max: 25}).withMessage('lastName must be between 3 and 25 characters.'),

        body("email")
            .exists().withMessage('email is required.')
            .isEmail().withMessage('enter a valid email'),

        body('password')
            .exists().withMessage('password is required.')
            .isString().withMessage('password must be string.')
            .matches(/^(?=.*[A-Z])[A-Za-z\d!@#%&]{8,}$/).withMessage('Password must be at least 8 characters, include only one uppercase letter and special characters from !@#%&')
            .isLength({min: 8, max: 30}).withMessage('password must be between 8 and 30 characters.')
    ];
}

module.exports = {createUserValidation}