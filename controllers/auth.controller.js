const {validationResult} = require('express-validator');

const userModle = require('../models/user.model');

const httpStatusText = require('../utils/httpStatusText');
const AppError = require('../utils/appError');

const asyncWrapper = require('../middlewares/asyncWrapper.middleware');

const register = asyncWrapper(
    async (req, res, next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            AppError.create(errors.array(), 400, httpStatusText.FAIL);
            return next(AppError);
        }

        const isMailExists = await userModle.findOne({email: req.body.email});
        if(isMailExists) {
            AppError.create("User already exists.", 400, httpStatusText.FAIL);
            return next(AppError);
        }

        const newUser = new userModle(req.body);
        await newUser.save();

        res.status(201).json({
            status: httpStatusText.SUCCESS,
            data: {user: newUser}
        });
    }
);

const login = asyncWrapper(
    async (req, res, next) => {
        
    }
);

module.exports = {
    register,
    login
}