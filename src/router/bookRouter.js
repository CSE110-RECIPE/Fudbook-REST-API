const express = require('express');
const request = require('../js/request');

const routes = (admin, dbRef) => {
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
                admin.auth().getUser(req.body.uid)
                    .then( userRecord => {

                        const newBookKey = dbRef.child('book').push().key;

                        dbRef.child('book/' + newBookKey).set({
                            name: req.body.name,
                            recipes: req.body.recipes,
                            author: req.body.uid,
                            default: false
                        });

                        dbRef.child('user/' + req.body.uid + '/other').update({
                            [newBookKey]: newBookKey
                        });

                        res.end(`Book created.`);
                    })
                    .catch( err => {
                        res.end(`POST request create book: User authentication`
                            + ` failed.`);
                    });  
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

    /**
     * TODO: Need to reroute
     */
    Router.route('/book/newUser')
        .post((req, res) => {
            /**
             * req.body 
             * {
             *      "uid": string
             * }
             */

            admin.auth().getUser(req.body.uid)
            .then(val => {
                const newFavoriteKey = dbRef.child('book').push().key;
                const newPersonalBookKey = dbRef.child('book').push().key;

                dbRef.child('book/' + newFavoriteKey).set({
                    name: "Favorite",
                    recipes: [],
                    author: req.body.uid,
                    default: true
                });

                dbRef.child('book/' + newPersonalBookKey).set({
                    name: "My Book",
                    recipes: [],
                    author: req.body.uid,
                    default: true
                });
            
                dbRef.child('user/' + req.body.uid).set({
                    favorite: newFavoriteKey,
                    personal: newPersonalBookKey,
                    other: []
                })
            
                res.end(`User bookshelf has been setup.`);
            })
            .catch(err => {
                console.log(err.message);
                res.end(`POST request create user: User authentication failed.`);
            });
        });
    
    return Router;
}

module.exports = routes;