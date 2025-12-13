const httpStatusText = require('../utils/httpStatusText');

const notFoundMiddleware = (req, res, next) => {
    res.status(404).send({
        status: httpStatusText.ERROR,
        message: `This resource is not available ${req.url}`
    })
}

module.exports = notFoundMiddleware;