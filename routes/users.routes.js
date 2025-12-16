const express = require('express');

const router = express.Router();

const usersController = require('../controllers/users.controller');

const verifyJWTtokenMiddleware = require('../middlewares/verifyJWTtoken.middleware');
const sameUserMiddleware = require('../middlewares/sameUser.middleware');
const usersMiddlewareValidation = require('../middlewares/users.validationSchema');
const allowedToMiddleware = require("../middlewares/allowedTo.middleware");

const userRoles = require("../utils/userRoles");

router.route('/')
        .get(verifyJWTtokenMiddleware, usersController.getAllUsers);

router.route('/:userId')
        .get(verifyJWTtokenMiddleware, sameUserMiddleware, usersController.getUser)
        .patch(verifyJWTtokenMiddleware, sameUserMiddleware, usersMiddlewareValidation.updateUserValidation(), usersController.updateUser)
        .delete(verifyJWTtokenMiddleware, allowedToMiddleware(userRoles.ADMIN, userRoles.MANAGER), usersController.deleteUser);

module.exports = { router };