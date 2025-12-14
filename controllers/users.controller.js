const userModle = require('../models/user.model');

const httpStatusText = require('../utils/httpStatusText');

const asyncWrapper = require('../middlewares/asyncWrapper.middleware');

const getAllUsers = asyncWrapper(
    async (req, res) => {
        const limit = +req.query.limit || 6;
        const page = +req.query.page || 1;
        const skip = (page - 1) * limit;
        const users = await userModle.find({}, {__v: false}).limit(limit).skip(skip);

        res.status(200).json({
            status: httpStatusText.SUCCESS,
            data: { users }
        });
    }
)

module.exports = {
    getAllUsers
}