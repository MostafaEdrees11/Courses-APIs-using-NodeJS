const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const fs = require('fs');
const path = require('path');

const userModle = require('../models/user.model');

const httpStatusText = require('../utils/httpStatusText');
const AppError = require('../utils/appError');

const asyncWrapper = require('../middlewares/asyncWrapper.middleware');

const getAllUsers = asyncWrapper(
    async (req, res) => {
        const limit = +req.query.limit || 6;
        const page = +req.query.page || 1;
        const skip = (page - 1) * limit;
        const users = await userModle.find({}, { password: false, __v: false }).limit(limit).skip(skip);

        res.status(200).json({
            status: httpStatusText.SUCCESS,
            data: { users }
        });
    }
);

const getUser = asyncWrapper(
    async (req, res, next) => {
        const user = await userModle.findById(req.params.userId, { password: false, token: false, role: false, __v: false });
        if (!user) {
            AppError.create('User not found', 404, httpStatusText.FAIL);
            return next(AppError);
        }

        res.status(200).json({
            status: httpStatusText.SUCCESS,
            data: { user }
        });
    }
);

const updateUser = asyncWrapper(
    async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            AppError.create(errors.array(), 400, httpStatusText.FAIL);
            return next(AppError);
        }

        let user = await userModle.findById(req.params.userId);
        if (!user) {
            AppError.create('User not found', 404, httpStatusText.FAIL);
            return next(AppError);
        }

        const forbiddenAccessToUpdate = ['role', 'id', '_id', '__v', 'token'];
        forbiddenAccessToUpdate.forEach((field) => {
            if (Object.keys(req.body).indexOf(field) != -1) {
                AppError.create(`Access Denied to update ${field} ❌❌.`, 401, httpStatusText.ERROR);
                return next(AppError);
            }
        });

        if (Object.keys(req.body).indexOf('password') != -1) {
            const hashingPassword = await bcrypt.hash(req.body.password, 8);
            req.body.password = hashingPassword;
        }

        await user.updateOne({ $set: { ...req.body } });
        res.status(202).json({
            status: httpStatusText.SUCCESS,
            data: null
        });
    }
);

const deleteUser = asyncWrapper(
    async (req, res, next) => {
        const user = await userModle.findById(req.params.userId);
        if (!user) {
            AppError.create('User not found', 404, httpStatusText.FAIL);
            return next(AppError);
        }

        const profileImgPath = path.join('uploads', 'profileImages', user.profileImg);
        fs.rmSync(profileImgPath);
        await user.deleteOne();

        res.status(202).json({
            status: httpStatusText.SUCCESS,
            data: null
        });
    }
);


module.exports = {
    getAllUsers,
    getUser,
    updateUser,
    deleteUser
}