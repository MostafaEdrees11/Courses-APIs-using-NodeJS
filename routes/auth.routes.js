const express = require('express');

const router = express.Router();

const authController = require('../controllers/auth.controller');
const usersMiddlewareValidation = require('../middlewares/users.validationSchema');
const uploadProfileImageMiddleware = require('../middlewares/uploadProfileImage.middleware');

router.route('/register')
        .post(uploadProfileImageMiddleware.single('profileImg'), usersMiddlewareValidation.createUserValidation(), authController.register);

router.route('/login')
        .post(usersMiddlewareValidation.userLoginValidation(), authController.login);


module.exports = { router };