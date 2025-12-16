const multer = require('multer');

const httpStatusText = require('../utils/httpStatusText');
const AppError = require('../utils/appError');

const fileFilter = (req, file, cb) => {
    const fileType = file.mimetype.split('/')[0];
    const fileExtension = file.mimetype.split('/')[1];

    if (fileType != 'image') {
        AppError.create(`${fileExtension} extension is not allowed as profile image.`, 400, httpStatusText.FAIL);
        return cb(AppError, false);
    }

    cb(null, true)
}

const diskStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/profileImages')
    },
    filename: function (req, file, cb) {
        const fileName = `user-${Date.now()}.${file.mimetype.split('/')[1]}`;
        cb(null, fileName);
    }
});

module.exports = multer({ storage: diskStorage, fileFilter });