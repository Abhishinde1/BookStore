/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import express from 'express';
import * as bookscontroller from '../controllers/books.controller';
import { userAuthentication } from '../middlewares/auth.middleware';


const router = express.Router();

//route to get all books
router.get('', bookscontroller.getAllbooks);

//router to get a particular book by id
router.get('/:_id',userAuthentication,bookscontroller.Getbook);

export default router;
