const jwt = require('jsonwebtoken')
require('dotenv').config()

const createTokens = (user) => {
    const accessToken = jwt.sign({id: user._id, email: user.email}, process.env.SECRET_ACCESS_TOKEN, {
        expiresIn: '30s'
    })

    const refreshToken = jwt.sign({id: user._id, email: user.email}, process.env.SECRET_REFRESH_TOKEN, {
        expiresIn: '1d'
    })
    
    return { accessToken, refreshToken }
}

const validateToken = (req, res, next) => {
    const refreshToken = req.cookies["refresh-token"]

    if (!refreshToken)
        return res.status(403).json({ error: "User not authenticated" })

    try {
        const validToken = jwt.verify(refreshToken, process.env.SECRET_ACCESS_TOKEN)
        if (validToken) {
            next()
        }
    } catch (error) {
        return res.status(500).json({ error })
    }
}

module.exports = { createTokens, validateToken }