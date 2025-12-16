const jwt = require('jsonwebtoken');

const httpStatusText = require('../utils/httpStatusText');
const AppError = require('../utils/appError');

const verifyJWTtoken = (req, res, next) => {
    const authorizationHeader = req.headers['Authorization'] || req.headers['authorization'];
    if(!authorizationHeader) {
        AppError.create('Token is required.', 401, httpStatusText.ERROR);
        return next(AppError);
    }
    const token = authorizationHeader.split(' ')[1];
    
    try {
        const currentUser = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
        req.currentUser = currentUser;
        next();
    } catch (error) {
        AppError.create('Invalid JWT token', 401, httpStatusText.ERROR);
        return next(AppError);
    }
}

module.exports = verifyJWTtoken;