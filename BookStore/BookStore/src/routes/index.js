/* eslint-disable prettier/prettier */
import express from 'express';
const router = express.Router();

import userRoute from './user.route';
import booksRoute from './books.routes';
import cartRoute from './cart.routes';


/**
 * Function contains Application routes
 *
 * @returns router
 */
const routes = () => {
  router.get('/', (req, res) => {
    res.json('Welcome');
  });
  router.use('/users', userRoute);
  router.use('/books', booksRoute);
  router.use('/carts', cartRoute);

  return router;
};

export default routes;
