const jwt = require('jsonwebtoken')
require('dotenv').config()

const createTokens = (user) => {
    const accessToken = jwt.sign({id: user._id, email: user.email}, process.env.SECRET_ACCESS_TOKEN)

    const refreshToken = jwt.sign({id: user._id, email: user.email}, process.env.SECRET_REFRESH_TOKEN)
    
    return { accessToken, refreshToken }
}

const validateToken = (req, res, next) => {
    // console.log(req.cookies)
    const refreshToken = req.cookies["refresh-token"]

    if (!refreshToken)
        return res.status(401).json({ error: "User not authenticated" })

    try {
        const validToken = jwt.verify(refreshToken, process.env.SECRET_REFRESH_TOKEN)
        if (validToken) {
            req.user = validToken
            next()
        }
    } catch (error) {
        return res.status(500).json({ error })
    }
}

const deleteToken = (req, res, next) => {
    try {
        const accessToken = req.cookies['access-token']
        const refreshToken = req.cookies['refresh-token']

        console.log('Access-Token value: ', accessToken)
        console.log('Refresh-Token value: ', refreshToken)

        res.clearCookie('access-token', { httpOnly: true })
        res.clearCookie('refresh-token', { httpOnly: true })

        return res.status(200).json({ message: 'Tokens cleared Successfully' })
        next()
    }
    catch (error) {
        return res.status(500).json({ error })
    }
}

module.exports = { createTokens, validateToken, deleteToken }