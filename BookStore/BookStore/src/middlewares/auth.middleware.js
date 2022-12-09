/* eslint-disable prettier/prettier */
/* eslint-disable quotes */
/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */
import HttpStatus from 'http-status-codes';
import jwt from 'jsonwebtoken';

 /**
  * Middleware to authenticate if user has a valid Authorization token
  * Authorization: Bearer <token>
  *
  * @param {Object} req
  * @param {Object} res
  * @param {Function} next
  */
 export const userAuth = async (req, res, next) => {
   try {
     let bearerToken = req.header('Authorization');
     if (!bearerToken)
       throw {
      code: HttpStatus.BAD_REQUEST,
         message: 'Authorization token is required'
       };
     bearerToken = bearerToken.split(' ')[1];

     const { user } = await jwt.verify(bearerToken, process.env.SCERET_KEY);
     req.body.UserId=user.EmailId
     next();
   } catch (error) {
          res.status(HttpStatus.UNAUTHORIZED).json({
            code:HttpStatus.UNAUTHORIZED,
            message:`${error}`
          });
        }
      };

/*Middleware  for books*/
export const userAuthentication= async (req, res, next) => {
  try {
    let bearerToken = req.header('Authorization');
    
    if (!bearerToken)
      throw {
        code: HttpStatus.BAD_REQUEST,
        message: 'Authorization token is required'
      };
    bearerToken = bearerToken.split(' ')[1];
    
    const user = await jwt.verify(bearerToken, process.env.SECRET_KEY);
    console.log("user========>",user)
    req.body.UserId=user.EmailId;
    next();
  } catch (error) {
    res.status(HttpStatus.UNAUTHORIZED).json({
      code:HttpStatus.UNAUTHORIZED,
      message:`${error}`
    });
  }
};