const Router = require('express');
const router = new Router();
const {check} = require('express-validator') 

const controller = require('./authController');
const authMiddleware = require('./middleware/authMiddleware');

router.post('/registration', [
    check('username', 'Name cannot be empty').notEmpty(),
    check('password', 'Passwords needs to be 4-10 characters long').isLength({min: 4, max: 10}),
], controller.registration);
router.post('/login', controller.login);
router.get('/users', authMiddleware, controller.getUsers);

module.exports = router;