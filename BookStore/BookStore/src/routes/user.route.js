/* eslint-disable prettier/prettier */
import express from 'express';
import * as userController from '../controllers/user.controller';
import { newUserValidator } from '../validators/user.validator';
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

//route to create a new user
router.post('/Register', newUserValidator, userController.NewUserregistration);

//route to login a new user
router.post('/login', userController.Userlogin);

//route to forgot password
router.post('/forgotpwd', userController.forgotPwd);

//route to reset password
router.post('/resetpwd',userAuth, userController.resetPassword);

export default router;