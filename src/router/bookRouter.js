const express = require('express');
const request = require('../js/request');

const bookModel = require('../model/bookModel');

const routes = () => {
    const Router = express.Router();

    Router.route('/book/bookshelf')
        .post((req, res) => {
            /**
             * req.body
             * {
             *      bookshelf: book_id[]
             * }
             */

            if (!req.body.bookshelf) {

                res.end(`Request body format incorrect: bookself not found.`);

            } else {

                const options = {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        bookshelf: req.body.bookshelf
                    })
                };

                request.service(options, process.env.PORT2, res);
            }
        });
    
    Router.route('/book')
        .post((req, res) => {
            /**
             * req.body
             * {
             *      name: string,
             *      recipes: recipe_id[],
             *      uid: string
             * 
             * }
             */

            if (!req.body.name) {

                res.end(`Request body format incorrect: name not found.`);

            } else if (!req.body.recipes) {

                res.end(`Request body format incorrect: recipes not found.`);

            } else if (!req.body.uid) {

                res.end(`Request body format incorrect: bookself not found.`);

            } else {
                const response = bookModel.createBook(req.body);

                response
                    .then(data => {
                        res.end(JSON.stringify(data));
                    })
                    .catch(error => {
                        res.end(JSON.stringify(error));
                    })
            }
        })
        .delete((req, res) => {
            /**
             * req.body
             * {
             *      "uid": string,
             *      "book_id": string
             * }
             */

            if (!req.body.uid) {
                res.end('Incorrect format');
            } else if (!req.body.book_id) {
                res.end('Incorrect format');
            } else {
                
                const options = {
                    method: 'DELETE',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        uid: req.body.uid,
                        book_id: req.body.book_id
                    })
                };

                request.service(options, process.env.PORT2, res);
            }
        });

    Router.route('/book/newUser')
        .post((req, res) => {
            /**
             * req.body 
             * {
             *      "uid": string
             * }
             */

            const response = bookModel.createNewUserBook(req.body.uid);

            response
                .then(data => {
                    res.end(JSON.stringify(data));
                })
                .catch(error => {
                    res.end(JSON.stringify(error));
                })
        });

    Router.route('/book/user')
        .post((req, res) => {
            /**
             * req.body 
             * {
             *      "uid": string
             * }
             */

            const response = bookModel.getUserBook(req.body.uid);

            response
                .then(data => {
                    res.end(JSON.stringify(data));
                })
        });

    Router.route('/book/recipe')
        .post((req, res) => {
            /**
             * req.body 
             * {
             *      "book_id": string,
             *      "recipes": recipe_id[]
             * }
             */

            const response = bookModel.addRecipeToBook(req.body.book_id, 
                req.body.recipes);
            
            response
                .then(data => {
                    res.end(JSON.stringify(data));
                })
                .catch(error => {
                    res.end(JSON.stringify(error));
                })

            })
        .delete((req, res) => {
             /**
             * req.body 
             * {
             *      "book_id": string,
             *      "recipeId": string
             * }
             */

            const response = bookModel.deleteRecipeFromBook(req.body.book_id,
                req.body.recipeId);

            response
                .then(data => {
                    res.end(JSON.stringify(data));
                })
                .catch(error => {
                    res.end(JSON.stringify(error));
                })
        })

    
    
    return Router;
}

module.exports = routes;