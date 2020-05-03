const express = require('express');
const request = require('../js/request');

const routes = (admin, dbRef) => {
    const Router = express.Router();

    Router.route('/recipe/filter')
        .get((req, res) => {

            /**
             * req.body
             * {
             *      exclude_filter: string[],
             *      include_filter: string[],
             *      custom_token: string // optional and low priority
             * }
             */

            const options = {
                method: 'POST',
                header: {},
                body: {
                    exclude_filter: req.body.exclude_filter,
                    include_filter: req.body.include_filter,
                }
            };

            request.service(options, process.env.PORT1, res, 'filterRecipe');
        });
    
    Router.route('/recipe/book')
        .get((req, res) => {

            /**
             * req.body
             * {
             *      recipes: recipe_id[]
             * }
             */

            const options = {
                method: 'POST',
                header: {},
                body: {
                    recipes: req.body.recipes
                }
            };

            request.service(options, process.env.PORT1, res, 'getRecipes');
        })
        .delete((req, res) => {

            /**
             * req.body
             * {
             *      uid: string
             *      book_id: string,
             *      recipe_id: string
             * }
             */
            
            admin.auth().getUser(req.body.uid)
                .then(userRecord => {

                    const book_id = req.body.book_id;
                    const recipe_id = req.body.recipe_id;

                    dbRef.child(`book/${book_id}/${recipe_id}`).remove();

                    res.end(`Recipe removed from book.`);
                })
        })

    Router.route('/recipe')
        .post((req, res) => {
            /**
             * req.body
             * {
             *      "uid": string,
             *      "name": string,
             *      "ingredients": string[],
             *      "categories": string[],
             *      "steps": string[],
             *      "image": string,
             *      "author": string,
             *      "editor": string
             * }
             */

            /**
             * TODO:
             * Add ingredient.json
             * Add the recipe_id to each corresponding ingredients
             */

            admin.auth().getUser(req.body.uid)
            .then(userRecord => {
                const newRecipeKey = dbRef.child('recipe').push().key;

                dbRef.child('recipe/' + newRecipeKey ).set(req.body);

                dbRef.child('book/' + userRecord.my_book + '/recipes').set({
                    newRecipeKey: newRecipeKey
                });

                res.end(`User created a recipe.`);
            })
            .catch(err => {
                console.log(err.message);
                res.end(`POST request create recipe: User authentication failed.`);
            });
        })
        .put((req, res) => {
            /**
             * req.body
             * {
             *      "uid": string,
             *      "recipe_id": string,
             *      "name": string,
             *      "ingredients": string[],
             *      "categories": string[],
             *      "steps": string[],
             *      "image": string,
             *      "editor": string
             * }
             */

            admin.auth().getUser(req.body.uid)
                .then(val => {
                    var updates = {};

                    if (req.body.name !== '')
                        updates[req.body.recipe_id + '/name'] = req.body.name;

                    if (req.body.ingredients.length !== 0 )
                        updates[req.body.recipe_id + '/ingredients'] 
                            = req.body.ingredients;

                    if (req.body.categories.length !== 0 )
                        updates[req.body.recipe_id + '/categories'] 
                            = req.body.categories;
                    
                    if (req.body.steps.length !== 0 )
                        updates[req.body.recipe_id + '/steps'] = req.body.steps;

                    if (req.body.image !== '')
                        updates[req.body.recipe_id + '/image'] = req.body.image;

                    if (req.body.editor !== '')
                        updates[req.body.recipe_id + '/editor']
                            = req.body.editor;

                    dbRef.child('recipe').update(updates);

                    res.end(JSON.stringify(updates));
                })
                .catch(err => {
                    console.log(err.message);
                    res.end(`PUT request edit: User authentication failed.`);
            });    
        })
        .delete((req, res) => {
            /**
             * req.body
             * {
             *      "uid": string
             *      "recipe_id": string
             * }
             */
            
            /**
             * Lazy deletion
             */
            dbRef.child('recipe').child(req.body.recipe_id).set({
                removed: true
            });

            res.end(`Recipe ${req.body.recipe_id} deleted`);
        });

    return Router;
}

module.exports = routes;