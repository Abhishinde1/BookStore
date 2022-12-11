/* eslint-disable prettier/prettier */
//import { optional, string, number} from '@hapi/joi';
import { Schema, model } from 'mongoose';

const cartSchema = new Schema(
    {
        userId: {
            type: String
        },
        books: [{
            productId: {
                type: String
            },
            description: {
                type: String
            },
            bookName: {
                type: String
            },
            bookImage: {
                type: String
            },
            author: {
                type: String
            },
            quantity: {
                type: Number,
                default: 1
            },
            price: {
                type: Number
            }
        }],
        cart_total: {
            type: Number
        },
        isPurchased: {
            type: Boolean,
            default: false
        }
    }
)

export default model('Cart', cartSchema,'Cart');