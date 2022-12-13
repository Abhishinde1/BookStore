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


//Controller to Remove a book  Quantity from cart
export const removeBook = async (req, res, next) => {
    try {
        const data = await cartService.removeBook(req.body.EmailId, req.params._id);
        res.status(HttpStatus.CREATED).json({
            code: HttpStatus.CREATED,
            data: data,
            message: 'Book removed successfully'
        });
    } catch (error) {
        next(error);
    }
};


/**
 * Controller to remove books from cart
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const removeBookFromCart = async (req, res) => {
  try {
    const data = await cartService.removeBookFromCart(req.body, req.params._id);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'book removed from cart successfully'
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
    });
  }
};

