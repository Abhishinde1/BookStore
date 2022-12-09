/* eslint-disable prettier/prettier */
/* eslint-disable quotes */
/* eslint-disable eqeqeq */
/* eslint-disable max-len */
/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */
import User from '../models/user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


//create new user registration
export const NewUserregistration = async (body) => {
    const saltRounds = 10;
    const hashpassword = await bcrypt.hash(body.password,saltRounds);
    body.password = hashpassword;
    const data = await User.create(body);
    return data;
  };

//login user
export const Userlogin=async(body)=>{
  console.log("body============>",body);
  const data = await User.findOne({EmailId:body.EmailId});
  console.log("data===========>",data);
  if(data !== null){
    const result=await bcrypt.compare(body.password, data.password);
    console.log("result===========>",result);
    if(result){
      var token=jwt.sign({EmailId:data.EmailId, id:data._id},
        process.env.SECRET_KEY);
      return token;
    }
    else
    {
      throw new Error('invalid password');

    }
  }else
  {
    throw new Error('invalid email');
  }
};

//forgot password
export const forgotPwd = async (body) => {
  const data = await User.findOne({ email: body.email });
  if (data != null) {
    var token = jwt.sign({ Firstname: data.Firstname, EmailId: data.EmailId }, process.env.SECRET_KEY);
    sendMail(body.EmailId)
    return token;

  } else {
    throw new Error("Invalid Email");
  }
};

//reset password
export const resetPassword=async(body)=>{
  const saltRounds=10;
  const hashPassword=await bcrypt.hash(body.password,saltRounds);
  body.password=hashPassword;
  const data=await User.findOneAndUpdate(
    {EmailId:body.EmailId},
    body,
    {
      new:true
    }
  );
  return data;
};
