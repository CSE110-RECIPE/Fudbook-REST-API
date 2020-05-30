const express = require('express');

const routes = (dbRef, bookPtr) => {
    const Router = express.Router();

    Router.route('/')
        .post((req, res) => {
            /**
             * req.body
             * {
             *    bookshelf: book_id[]
             * }
             */

            var bookList = {};

            req.body.bookshelf.forEach(item => {
                bookList[item] = bookPtr.book[item];
            });

            res.end(JSON.stringify(bookList));
        })
        .delete((req, res) => {
            /**
             * req.body
             * {
             *      "uid": string,
             *      "book_id": string
             * }
             */

             if (bookPtr.book[`${req.body.book_id}`] && bookPtr.book[`${req.body.book_id}`].author === req.body.uid) {
                dbRef.child('book/' + req.body.book_id).remove();
                dbRef.child('user/' + req.body.uid + '/other/' + req.body.book_id).remove();
                res.end(JSON.stringify({message:`User removed the book.`}));
             } else {
                res.end(JSON.stringify({message:`User does not own the book.`}));
             }
        })

    return Router;
}

module.exports = routes