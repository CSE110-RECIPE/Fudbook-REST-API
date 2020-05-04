const express = require('express');
const request = require('../js/request');

const routes = (admin, dbRef) => {
    const Router = express.Router();

    Router.route('/book/bookshelf')
        .get((req, res) => {
            /**
             * req.body
             * {
             *      bookshelf: book_id[]
             * }
             */

            const options = {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    bookshelf: req.body.bookshelf
                })
            };

            request.service(options, process.env.PORT2, res);
        });
    
    Router.route('/book')
        .post((req, res) => {
            /**
             * req.body
             * {
             *      name: string,
             *      recipes: string[],
             *      uid: string,
             *      default: boolean
             * 
             * }
             */

            admin.auth().getUser(req.body.uid)
                .then( userRecord => {

                    const newBookKey = dbRef.child('book').push().key;

                    dbRef.child('book/' + newBookKey).set({
                        name: req.body.name,
                        recipes: req.body.recipes,
                        author: req.body.uid,
                        default: false
                    });

                    res.end(`Book created.`);
                })
                .catch( err => {
                    res.end(`POST request create book: User authentication`
                        + ` failed.`);
                });  
        })
        .delete((req, res) => {
            // TODO
        });

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
            
                admin.auth().updateUser(req.body.uid, {
                    favorite_book: newFavoriteKey,
                    my_book: newPersonalBookKey
                })
                    .catch(err => {
                        console.log(err.message);
                        res.end(`POST request create user: User update failed.`);
                    });
            
                res.end(`Your bookshelf has been setup.`);
            })
            .catch(err => {
                console.log(err.message);
                res.end(`POST request create user: User authentication failed.`);
            });
        });
    
    return Router;
}

module.exports = routes;