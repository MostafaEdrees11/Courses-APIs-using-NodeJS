const express = require('express');

const router = express.Router();

const usersController = require('../controllers/users.controller');

const verifyJWTtokenMiddleware = require('../middlewares/verifyJWTtoken.middleware');

router.route('/')
        .get(verifyJWTtokenMiddleware, usersController.getAllUsers);


module.exports = {router};