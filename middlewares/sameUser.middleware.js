const httpStatusText = require('../utils/httpStatusText');
const AppError = require('../utils/appError');
const { param } = require('express-validator');

const sameUser = (req, res, next) => {
    if(req.currentUser.id != req.params.userId) {
        AppError.create("Access Denied ❌❌.", 401, httpStatusText.ERROR);
        return next(AppError);
    }

    next();
}

module.exports = sameUser;