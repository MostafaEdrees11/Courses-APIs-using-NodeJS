const express = require('express');

const router = express.Router();

const authController = require('../controllers/auth.controller');
const usersMiddlewareValidation = require('../middlewares/users.validationSchema');

router.route('/register')
        .post(usersMiddlewareValidation.createUserValidation(), authController.register);

router.route('/login')
        .post(usersMiddlewareValidation.userLoginValidation(), authController.login);


module.exports = {router};