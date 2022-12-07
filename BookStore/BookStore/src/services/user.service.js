/* eslint-disable prettier/prettier */
import User from '../models/user.model';
import bcrypt from'bcrypt';
//get all users
export const getAllUsers = async () => {
  const data = await User.find();
  return data;
};

//create new user registration
export const NewUserregistration = async (body) => {
  {
    const saltRounds=10;
    const hashPassaword=await bcrypt.hash(body.Password,saltRounds);
    body.Password=hashPassaword;
    const data = await User.create(body);
    return data;
  }
};

//login user
export const loginUser = async (body) => {
  const data = await User.findOne({ EmailId: body.EmailId });
  if (data !== null) {
    const result = await bcrypt.compare(body.password, data.password);
    if (result) {
      var token = jwt.sign(
        { EmailId: data.EmailId, _id: data._id },
        process.env.SECRET_KEY
      );
      return token;
    } else {
      throw new Error('password is invalid');
    }
  } else {
    throw new Error('email is Invalid');
  }
};