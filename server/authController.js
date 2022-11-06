const User = require('./models/User');
const Role = require('./models/Role');

const bcrypt = require('bcryptjs');

class authController {
    async registration(req, res) {
        try {
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
            res.json('getUser is working')
        } catch (e) {
            console.log(e);
            res.status(400).json({message: 'getUsers error'})
        }
    }
}

module.exports = new authController();