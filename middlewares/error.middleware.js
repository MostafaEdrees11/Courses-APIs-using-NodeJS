const httpStatusText = require('../utils/httpStatusText');

const errorMiddleware = (error, req, res, next) => {
    res.status(error.statusCode || 500).send({
        status: error.httpStatusText || httpStatusText.ERROR,
        message: error.message,
        code: error.statusCode || 500
    });
}

module.exports = errorMiddleware;