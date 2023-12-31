const jwt = require('jsonwebtoken')

const generateAccessToken = (uid, role) => jwt.sign({_id: uid, role: role}, process.env.JWT_SECRET, {expiresIn: process.env.TOKEN_EXPIRES})
const generateRefreshToken = (uid) => jwt.sign({_id: uid}, process.env.JWT_SECRET, {expiresIn: process.env.REFRESH_TOKEN_EXPIRES})

module.exports = {
    generateAccessToken,
    generateRefreshToken
}