/* eslint-disable prettier/prettier */
/* eslint-disable quotes */
/* eslint-disable prettier/prettier */
import HttpStatus from 'http-status-codes';
import * as UserService from '../services/user.service';

/**
 * Controller to create a new user
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
 export const NewUserregistration = async (req, res, next) => {
  try {
    const data = await UserService.NewUserregistration(req.body);
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: data,
      message: 'User created successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to loginuser a user
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
 export const Userlogin = async (req, res, next) => {
  try {
    const data = await UserService.Userlogin(req.body);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'User login successfully'
    });
  } catch (error) {
    next(error);
  }
};
//forgot password
export const forgotPwd = async (req, res, next) => {
  try {
    const data = await UserService.forgotPwd(req.body);
    res.status(HttpStatus.ACCEPTED).json({
      code: HttpStatus.ACCEPTED,
      data: data,
      message: "link to reset a password sent to your emailId "
    });
}catch (error) {
  next(error);
}
};

//reset password
export const resetPassword = async (req, res, next) => {
  try {
    const data = await UserService.resetPassword(req.body);
    res.status(HttpStatus.ACCEPTED).json({
      code: HttpStatus.ACCEPTED,
      data: data,
      message: "password updated successfully"
    });
}catch (error) {
  next(error);
}
}