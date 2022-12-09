/* eslint-disable prettier/prettier */
import HttpStatus from 'http-status-codes';
import * as bookservice from '../services/books.service'

/**
 * Controller to get all books available
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
 export const getAllbooks = async (req, res,) => {
    try {
      const data = await bookservice.getAllbooks(req.body);
      res.status(HttpStatus.ACCEPTED).json({
        code: HttpStatus.ACCEPTED,
        data: data,
        message: 'All books fetched successfully'
      });
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json({
        code: HttpStatus.BAD_REQUEST,
        message: `${error}`
      });
    }
  };

  /**
 * Controller to get a book By ID
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
 export const Getbook = async (req, res) => {
    try {
      const data = await bookservice.Getbook(req.params._id, req.body);
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: data,
        message: 'book fetched successfully'
      });
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json({
        code: HttpStatus.BAD_REQUEST,
        message: `${error}`
      });
    }
  };