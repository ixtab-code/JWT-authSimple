const User = require('./models/User');
const Role = require('./models/Role');
const {validationResult} = require('express-validator')
const bcrypt = require('bcryptjs');
require('dotenv').config()
const jwt  = require('jsonwebtoken');

const jwtSecretKey = process.env.jwtSecretKey;

const generateAccessToken = (id, roles) => {
    const payload = {
        id, 
        roles
    }
    return jwt.sign(payload, jwtSecretKey, {expiresIn: '24h'})
}
class authController {
    async registration(req, res) {
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()) {
                return res.status(400).json({message: 'Registration failed'}, errors)
            } 

            const {username, password} = req.body;
            const candidate = await User.findOne({username})
            if(candidate) {
                return res.status(400).json({message: "User already exists", user: candidate})
            }
            const hashPassword = bcrypt.hashSync(password, 7);
            const userRole = await Role.findOne({value: 'USER'})
            const user = new User({username, password: hashPassword, roles: [userRole.value]});
            await user.save();
            return res.json({message: "User succesfully saved"});
        } catch (e) {
            console.log(e);
            res.status(400).json({message: 'Regisation error'})
        }
    }

    async login(req, res) {
        try {
            const {username, password} = req.body;
            const user = await User.findOne({username})
            if (!user) {
                return res.status(400).json({message: `Username ${username} not found`})
            }

            const validPassword = bcrypt.compareSync(password, user.password)

            if(!validPassword) {
                return res.status(400).json({message: 'Incorrect password'})   
            }
            const token = generateAccessToken(user._id, user.roles);
            return res.json({token});
        } catch (e) {
            console.log(e);
            res.status(400).json({message: 'Login error'})
        }
    }

    async getUsers(req, res) {
        try {
            /* const userRole = new Role(); */
            /* const adminRole = new Role({value: 'Admin'}); */
            /* await userRole.save(); */
            /* await adminRole.save(); */
            const users = await User.find();
            res.json(users)
        } catch (e) {
            console.log(e);
            res.status(400).json({message: 'getUsers error'})
        }
    }
}

module.exports = new authController();