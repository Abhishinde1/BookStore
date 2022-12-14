/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable eqeqeq */
/* eslint-disable quotes */
/* eslint-disable max-len */
/* eslint-disable prettier/prettier */
import Book from '../models/books.model';
import Wishlist from '../models/wishlist.model';


//adding book to wishlist
export const addBookToWishlist = async (EmailId, params_book_id) => {
    const checkBook = await Book.findOne({ _id: params_book_id });
    console.log("Check book", checkBook);
    if (checkBook) {
        const userWishlist = await Wishlist.findOne({ userId: EmailId });
        console.log("Book Exists");
        let bookInfo = {
            'productId': checkBook._id,
            'description': checkBook.description,
            'bookName': checkBook.bookName,
            'bookImage': checkBook.bookImage,
            'author': checkBook.author,
            'price': parseInt(checkBook.price),
        }
        if (userWishlist == null) {
            console.log("For new User");
            const createWishlist = await Wishlist.create({ userId:EmailId, books: [bookInfo], cart_total: checkBook.price })
            return createWishlist;
        } else {
            console.log("For Existing User");
            let bookFound = false
            let totalPrice = 0
            userWishlist.books.forEach(element => {
                if (element.productId == params_book_id) {
                    element.quantity = element.quantity + 1
                    bookFound = true
                }
            });
            if (bookFound == false) {
                userWishlist.books.push(bookInfo)
                console.log("added a new book");
            }
            let wishlistView = await Wishlist.findOneAndUpdate({ userId: EmailId }, { books: userWishlist.books, cart_total: totalPrice }, { new: true })
            return wishlistView;
        }
    } else {
        throw new Error("Book doesn't Exist");
    }
}

//remove product from wishlist
export const removeproductFromWishlist = async (EmailId, params_book_id) => {
    const userWishlist = await Wishlist.findOne({ userId: EmailId });
    if (userWishlist) {
        console.log("If User Exists");
        let bookFound = false
        userWishlist.books.forEach(element => {
            if (element.productId == params_book_id) {
                console.log("If Book found");
                let indexOfElement = userWishlist.books.indexOf(element)
                userWishlist.books.splice(indexOfElement, 1)
                bookFound = true
            }
        });
        console.log("After deleting the book",userWishlist.books);
        if (bookFound == false) {
            console.log("If Book not found");
        }

        const updatedWishlist = await Wishlist.findOneAndUpdate({ userId: EmailId}, { books: userWishlist.books }, { new: true })
        return updatedWishlist;
    } else {
        throw new Error("cart doesn't exist");
    }
};
