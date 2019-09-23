var router = require('express').Router();
const UserController = require('../Controllers/UserController');
var passport = require('passport');

router.post('/create', UserController.user_create);
router.post('/login', UserController.user_login);
router.post('/find', UserController.find);
router.get('/logout',UserController.logout);

module.exports = router;