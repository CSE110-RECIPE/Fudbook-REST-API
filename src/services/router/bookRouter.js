const express = require('express');

const routes = (book) => {
    const Router = express.Router();

    Router.route('/')
        .post('/', (req, res) => {
            /**
             * req.body
             * {
             *    bookshelf: book_id[]
             * }
             */

            var bookList = {};

            req.body.bookshelf.forEach(item => {
                bookList[item] = book[item];
            });

            res.end(JSON.stringify(book));
        });

    return Router;
}

module.exports = routes