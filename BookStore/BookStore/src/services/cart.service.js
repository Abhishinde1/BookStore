/* eslint-disable prettier/prettier */
/* eslint-disable eqeqeq */
/* eslint-disable max-len */
/* eslint-disable prettier/prettier */
/* eslint-disable quotes */
/* eslint-disable prettier/prettier */
import Cart from '../models/cart.model';
import Book from '../models/books.model';
// import { check } from 'prettier';
//  import { books } from 'googleapis/build/src/apis/books';

//add books to cart
export const addedToCart = async (EmailId, params_book_id) => {
    const checkBook = await Book.findOne({ _id: params_book_id });
    console.log("Check book", checkBook);
    if (checkBook) {
        const userCart = await Cart.findOne({ userId: EmailId });
        console.log("Book Exists");
        let bookdetails = {
            'productId': checkBook._id,
            'description': checkBook.description,
            'bookName': checkBook.bookName,
            'bookImage': checkBook.bookImage,
            'author': checkBook.author,
            'price': parseInt(checkBook.price),
        }
        if (userCart == null) {
            console.log("For new User");
            const createCart = await Cart.create({ userId: EmailId, books: [bookdetails], cart_total: checkBook.price })
            return createCart;
        } else {
            console.log("For Existing User");
            let bookFound = false
            let totalPrice = 0
            userCart.books.forEach(element => {
                if (element.productId == params_book_id) {
                    element.quantity = element.quantity + 1
                    totalPrice = totalPrice + (element.price * element.quantity);
                    bookFound = true
                } else {
                    totalPrice = totalPrice + (element.price * element.quantity);
                    console.log("Cart Total after adding the same book:", totalPrice);
                }
            });
            if (bookFound == false) {
                userCart.books.push(bookdetails)
                console.log("added a new book");
                totalPrice = totalPrice + bookdetails.price;
                console.log("Cart Total after adding the book:", totalPrice);
            }
            let cartView = await Cart.findOneAndUpdate({ userId: EmailId }, { books: userCart.books, cart_total: totalPrice }, { new: true })
            return cartView;
        }
    } else {
        throw new Error("Book doesn't Exist");
    }
}


//remove book Quantity from cart
export const removeBook = async (EmailId, params_book_id) => {
    const checkCart = await Cart.findOne({ userId: EmailId });
    if (checkCart) {
        console.log("If User Exists");
        let bookFound = false
        let totalPrice = 0
       let bookquanitity=0
        checkCart.books.forEach(element => {
            if (element.productId == params_book_id) {
                element.quantity = element.quantity -= 1
                bookquanitity=element.quantity
                totalPrice = totalPrice - (element.price * element.quantity);
                console.log("If Book found");
                checkCart.books.splice(bookquanitity, 1)
                bookFound = true
            }
        });
        console.log("After deleting the book",checkCart.books);
        if (bookFound == false) {
            console.log("If Book not found");
            throw new Error("Book not in the cart");
        }

        const updatedCart = await Cart.findOneAndUpdate({ userId: EmailId}, { books: checkCart.books,cart_total: totalPrice}, { new: true })
        return updatedCart
    } else {
        throw new Error("User cart doesn't exist");
    }
};

//remove books from cart

export const removeBookFromCart = async (EmailId, params_book_id) => {
    const checkCart = await Cart.findOne({ userId: EmailId });
    if (checkCart) {
        console.log("If User Exists");
        let bookFound = false
        let totalPrice = 0
        let bookquanitity = 0
        checkCart.books.forEach(element => {
            if (element.productId == params_book_id) {
                element.quantity = element.quantity -= 1
                bookquanitity=element.quantity
                totalPrice = totalPrice - (element.price * element.quantity);
                let indexofelement = checkCart.books.indexOf(element);
                console.log("If Book found");
                checkCart.books.splice(indexofelement, 1)
                bookFound = true
            }
        });
        console.log("After deleting the book",checkCart.books);
        if (bookFound == false) {
            console.log("If Book not found");
            throw new Error("Book not in the cart");
        }

        const updatedCart = await Cart.findOneAndUpdate({ userId: EmailId}, { books: checkCart.books,cart_total: totalPrice}, { new: true })
        return updatedCart
    } else {
        throw new Error("User cart doesn't exist");
    }
};
