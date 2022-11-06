const User = require('./models/User');
const Role = require('./models/Role');

class authController {
    async registration(req, res) {
        try {
            
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