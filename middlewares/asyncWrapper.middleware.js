const asyncWrapper = (asyncFun) => {
    return (req, res, next) => {
        asyncFun(req, res, next)
            .catch((error) => next(error));
    }
}

module.exports = asyncWrapper;