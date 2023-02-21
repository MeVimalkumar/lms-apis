const { sign, verify } = require("jsonwebtoken")
const { PRIVATE_KEY } = require("../data/config")

function generateToken(data, expiresIn = '24h') {
    return sign(data, PRIVATE_KEY, { expiresIn })
}

function verifyToken(req, res, next) {
    try {
        let token = req.headers.authorization;
        let decoded = decodeToken(token);
        if (!decoded?.userId) {
            res.status(401).send();
        } else {
            res.locals.user = decoded;
            next();
        }
    } catch (error) {
        res.status(401).send();
    }
}

function decodeToken(token) {
    if (!token)
        return false
    if (token.includes('Bearer'))
        token = token.slice(7, token.length).trimLeft();
    return verify(token, PRIVATE_KEY);
}


module.exports = {
    generateToken,
    verifyToken,
    decodeToken,
}