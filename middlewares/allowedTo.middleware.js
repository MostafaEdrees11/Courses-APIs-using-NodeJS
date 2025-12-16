const userRoles = require('../utils/userRoles');
const httpStatusText = require('../utils/httpStatusText');
const AppError = require('../utils/appError');

const allowedTo = (...roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.currentUser.role)) {
            AppError.create("Access Denied ❌❌.", 401, httpStatusText.ERROR);
            return next(AppError);
        }

        next();
    }
}

module.exports = allowedTo;