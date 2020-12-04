'use strict';
var express = require('express');
var UserController = require('../controllers/user');
var userRouter = express.Router();

//userRouter.route('/updateUser/:user_id').user(commons.ensureAuthenticated, userController.updateUser);
userRouter.route('/login').post(UserController.loginUser);

module.exports = userRouter;