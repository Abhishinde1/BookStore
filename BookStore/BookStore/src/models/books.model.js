/* eslint-disable prettier/prettier */
//import { bool, boolean } from '@hapi/joi';
import { Schema, model } from 'mongoose';

const booksSchema = new Schema(
  {
    description: {
        type: String
      },
      discountPrice: {
        type: String,
         required: true
      },
      bookName: {
        type: String
      },
      bookImage: {
        type: String
      },
      admin_user_id:{
         type: String,
          required: true
      },
      author: {
        type: String
      },
      quantity: {
        type: Number,
        default:1
      },
      price: {
        type: Number
      }
  },
  {
    timestamps: true
  }
);


export default model('Books', booksSchema, 'Books');