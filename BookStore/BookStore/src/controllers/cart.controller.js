/* eslint-disable prettier/prettier */
/* eslint-disable max-len */
/* eslint-disable prettier/prettier */
import HttpStatus from 'http-status-codes';
import * as cartService from '../services/cart.service';

//Controller to create a new cart And add Book To card
export const addedToCart = async (req, res, next) => {
    try {
    const data = await cartService.addedToCart(req.body.EmailId,req.params._id);
        res.status(HttpStatus.CREATED).json({
            code: HttpStatus.CREATED,
            data: data,
            message: 'Added to Cart successfully'
        });
    } catch (error) {
        next(error);
    }
};