const jwt = require('jsonwebtoken');

module.exports = (payload, expireTime) => {
    return jwt.sign(payload, process.env.TOKEN_SECRET_KEY, {expiresIn: `${expireTime}`});
}