const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

const userModle = require('../models/user.model');

const httpStatusText = require('../utils/httpStatusText');
const AppError = require('../utils/appError');
const generateJWTtoken = require('../utils/generateJWTtoken');

const asyncWrapper = require('../middlewares/asyncWrapper.middleware');

const register = asyncWrapper(
    async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            AppError.create(errors.array(), 400, httpStatusText.FAIL);
            return next(AppError);
        }

        const isMailExists = await userModle.findOne({ email: req.body.email });
        if (isMailExists) {
            AppError.create("User already exists.", 400, httpStatusText.FAIL);
            return next(AppError);
        }

        const hashingPassword = await bcrypt.hash(req.body.password, 8);

        const newUser = new userModle({ ...req.body, password: hashingPassword, profileImg: req.file.filename });

        newUser.token = generateJWTtoken({ email: newUser.email, id: newUser._id, role: newUser.role }, '1m');

        await newUser.save();

        const { password, __v, ...safeUserData } = newUser._doc;
        res.status(201).json({
            status: httpStatusText.SUCCESS,
            data: { user: safeUserData }
        });
    }
);

const login = asyncWrapper(
    async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            AppError.create(errors.array(), 400, httpStatusText.FAIL);
            return next(AppError);
        }

        let inputEmail = req.body.email;
        let inputPassword = req.body.password;

        const isUserExists = await userModle.findOne({ email: inputEmail });
        if (!isUserExists) {
            AppError.create("This mail doen't exist.", 400, httpStatusText.FAIL);
            return next(AppError);
        }

        const isPasswordMatching = await bcrypt.compare(inputPassword, isUserExists.password);
        if (!isPasswordMatching) {
            AppError.create("Password is incorrect.", 400, httpStatusText.FAIL);
            return next(AppError);
        }

        isUserExists.token = generateJWTtoken({ email: isUserExists.email, id: isUserExists._id, role: isUserExists.role }, '1m');

        return res.status(200).json({
            status: httpStatusText.SUCCESS,
            data: { token: isUserExists.token }
        });
    }
);

module.exports = {
    register,
    login
}