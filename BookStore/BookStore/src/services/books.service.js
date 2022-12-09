/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import Books from '../models/books.model'


//get all books
export const getAllbooks = async () => {
  const data = await Books.find();
  if (data.length !== 0) {
      return data;
  } else {
      throw new Error('books are not available');
  }
}

  //get a Book by id
  export const Getbook = async (_id) => {
    const data = await Books.findById({ _id: _id});
    console.log('data=============>',data);
    return data;
  };