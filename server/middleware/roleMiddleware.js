require('dotenv').config()
const jwt = require('jsonwebtoken');
const jwtSecretKey = process.env.jwtSecretKey;

module.exports = function(roles) {
    return function(req, res, next ){
        if(req.method == 'OPTIONS') {
            next();
        }
    
        try {
            const token = req.headers.authorization.split('')[0];
            if(!token) {
                return res.status(403).json({message: 'User is not authorized'})
            }
            const {roles: userRole} = token.verify(token, jwtSecretKey);
            let hashRole = false;
            userRoles.foeEach(role => {
                if(roles.includes(role)) {
                    harRole = true;
                }
            })
            if(!hashRole) {
                return res.status(403).json({message: 'You don\'t have permission'});
            }
            next();
        } catch (e) {
            console.log(e);
            return res.status(403).json({message: "User is not authorized"})
        }
    }
}