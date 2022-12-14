require('dotenv').config()
const jwtSecretKey = process.env.jwtSecretKey;
const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    if(req.method == 'OPTIONS') {
        next();
    }

    try {
        const token = req.headers.authorization.split('')[0];
        if(!token) {
            return res.status(403).json({message: 'User is not authorized'})
        }
        const decodedData = jwt.verify(token, jwtSecretKey);
        req.user = decodedData;
        next();
    } catch (e) {
        console.log(e);
        return res.status(403).json({message: "User is not authorized"})
    }
}