/* eslint-disable prettier/prettier */
/* eslint-disable max-len */
/* eslint-disable prettier/prettier */
import HttpStatus from 'http-status-codes';
import * as wishlistService from '../services/wishlist.service';


export const addBookToWishlist = async (req, res) => {
    try {
        const data = await wishlistService.addBookToWishlist(req.body.EmailId, req.params._id);
        res.status(HttpStatus.CREATED).json({
            code: HttpStatus.CREATED,
            data: data,
            message: 'Added to Wishlist successfully'
        });
    } catch (error) {
        res.status(HttpStatus.BAD_REQUEST).json({
            code: HttpStatus.BAD_REQUEST,
            message: `${error}`
        })
    }
};

//remove from Wishlist
export const removeproductFromWishlist = async (req, res, next) => {
  try {
      const data = await wishlistService.removeproductFromWishlist(req.body.email, req.params._id);
      res.status(HttpStatus.CREATED).json({
          code: HttpStatus.CREATED,
          data: data,
          message: 'Product removed from Wishlist!!!!!!'
      });
  } catch (error) {
      next(error);
  }
};
