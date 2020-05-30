const express = require('express');
const request = require('../js/request');
const fs = require('fs');

const routes = (admin, dbRef) => {
    const Router = express.Router();

    const in_RAW = fs.readFileSync('./src/file/ingredients.json', 'utf8');
    const ingredient_list = JSON.parse(in_RAW);

    Router.route('/recipe/recommended')
        .get((req, res) => {
            const options = {
                method: 'GET'
            };

            request.service(options, process.env.PORT1, res, 'topRecipe');
        })
    
    Router.route('/recipe/filter')
        .post((req, res) => {

            /**
             * req.body
             * {
             *      exclude_filter: string[],
             *      include_filter: string[],
             *      category: string[],
             *      custom_token: string // optional and low priority
             * }
             */
            if (req.body.exclude_filter === undefined && req.body.include_filter === undefined) {
                res.end(`Request body format incorrect: filter cannot be `
                    + `undefined.`);
            } else {
                const options = {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        exclude_filter: req.body.exclude_filter,
                        include_filter: req.body.include_filter,
                    })
                };

                request.service(options, process.env.PORT1, res, 'filterRecipe');
            }
        });
    
    Router.route('/recipe/book')
        .post((req, res) => {

            /**
             * req.body
             * {
             *      recipes: recipe_id[]
             * }
             */

            if (!req.body.recipes)
                res.end(`Request body format incorrect: recipes not found`);
            else {
                const options = {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        recipes: req.body.recipes
                    })
                };

                request.service(options, process.env.PORT1, res, 'getRecipe');
            }
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
            
            if (!req.body.uid) {

                res.end(`Request body format incorrect: uid not found.`);

            } else if (!req.body.book_id) {

                res.end(`Request body format incorrect: book_id not found.`);

            } else if (!req.recipe_id) {
                
                res.end(`Request body format incorrect: recipe_id not found.`);

            } else {

                admin.auth().getUser(req.body.uid)
                    .then(userRecord => {

                        const book_id = req.body.book_id;
                        const recipe_id = req.body.recipe_id;

                        dbRef.child(`book/${book_id}/${recipe_id}`).remove();

                        res.end(`User removed recipe from book.`);
                    });
            }
        });

    Router.route('/recipe')
        .post((req, res) => {
            /**
             * req.body
             * {
             *      "uid": string
             *      "name": string,
             *      "ingredients": string[],
             *      "categories": string[],
             *      "steps": string[],
             *      "image": string,
             *      "author": string,
             *      "editor": string
             * }
             */

            if (!req.body.uid) {

                res.end(`Request body format incorrect: uid not found.`);

            } else if (!req.body.name) {

                res.end(`Request body format incorrect: name not found.`);

            } else if (!req.body.ingredients) {

                res.end(`Request body format incorrect: ingredients not found.`);

            } else if (!req.body.steps) {

                res.end(`Request body format incorrect: steps not found.`);

            } else if (!req.body.image) {

                res.end(`Request body format incorrect: image not found.`);

            } else if (!req.body.author) {

                res.end(`Request body format incorrect: author not found.`);

            } else if (!req.body.editor && req.body.editor !== '') {

                res.end(`Request body format incorrect: editor not found.`);

            } else {

                admin.auth().getUser(req.body.uid)
                .then(userRecord => {
                    const newRecipeKey = dbRef.child('recipe').push().key;

                    var newRecipe = req.body;
                    var tags = [];
                    var tagsUpdate = {};

                    console.log(req.body.ingredients);

                    Object.keys(ingredient_list).forEach(key => {
                        ingredient_list[key].forEach(item => {
                            req.body.ingredients.forEach(in_item => {
                                if (in_item === item) {
                                    tags.push(key);
                                    tagsUpdate[key + '/' + newRecipeKey] = 
                                        newRecipeKey;
                                }
                            });
                        });
                    });

                    /** Update ingredient data structure */
                    dbRef.child('ingredient').update(tagsUpdate);

                    /** Add tags to the newRecipe */
                    newRecipe['tags'] = tags;

                    /** Upload the new recipe */
                    dbRef.child('recipe/' + newRecipeKey ).set(newRecipe);

                    dbRef.child('user/' + req.body.uid + '/personal')
                        .once('value').then(snap => {
                            const bookId = snap.val();

                            dbRef.child('book/' + bookId + '/recipes').update({
                                [newRecipeKey]: newRecipeKey
                            })
                        });
                

                    res.end(JSON.stringify({
                        recipe_id: newRecipeKey,
                        message: "User created a recipe."
                    }));
                })
                .catch(err => {
                    console.log(err.message);
                    res.end(`POST request create recipe: User authentication `
                        + `failed.`);
                });
            }
        })
        .put((req, res) => {
            /**
             * req.body
             * {
             *      "uid": string,
             *      "recipe_id": string,
             *      "name": string,
             *      "categories": string[],
             *      "steps": string[],
             *      "image": string,
             * }
             */

            if (!req.body.uid) {
                res.end(`Request body format incorrect: uid not found.`);
            } else if (!req.body.recipe_id) {
                res.end(`Request body format incorrect: recipe not found.`);
            } else {

                admin.auth().getUser(req.body.uid)
                    .then(val => {
                        var updates = {};

                        if (req.body.name && req.body.name !== '')
                            updates[req.body.recipe_id + '/name'] 
                                = req.body.name;

                        if (req.body.categories 
                                && req.body.categories.length !== 0 )
                            updates[req.body.recipe_id + '/categories'] 
                                = req.body.categories;
                        
                        if (req.body.steps && req.body.steps.length !== 0 )
                            updates[req.body.recipe_id + '/steps'] 
                                = req.body.steps;

                        if (req.body.image && req.body.image !== '')
                            updates[req.body.recipe_id + '/image'] 
                                = req.body.image;

                        dbRef.child('recipe').update(updates);

                        res.end(`User edited a recipe.`);
                    })
                    .catch(err => {
                        console.log(err.message);
                        res.end(`PUT request edit: User authentication failed.`);
                });    
            }
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
            if (!req.body.uid)
                res.end(`Request body format incorrect: uid not found.`);
            else {
                const options = {
                    method: 'DELETE',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        uid: req.body.uid,
                        recipe_id: req.body.recipe_id
                    })
                };

                request.service(options, process.env.PORT1, res);
            }
        });

    return Router;
}

module.exports = routes;
