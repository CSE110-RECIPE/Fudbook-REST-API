const express = require('express');
const request = require('../js/request');
const fs = require('fs');
const recipeModel = require('../model/recipeModel');

const routes = () => {
    const Router = express.Router();

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

    Router.route('/recipe/book/delete')
        .post((req, res) => {

            /**
             * req.body
             * {
             *      uid: string
             *      book_id: string,
             *      recipe_id: string
             * }
             */
            
            if (!req.body.uid) {

                res.end(JSON.stringify({
                    message: `Request body format incorrect: uid not found.`
                }));

            } else if (!req.body.book_id) {

                res.end(JSON.stringify({
                    message: `Request body format incorrect: `
                                + `book_id not found.`
                }));

            } else if (!req.body.recipe_id) {
                
                res.end(JSON.stringify({
                    message: `Request body format incorrect: `
                                + `recipe_id not found.`
                }));

            } else {

                const response = recipeModel.deleteRecipeFromBook(req.body.uid, 
                    req.body.book_id,
                    req.body.recipe_id);

                response
                    .then(data => {
                        res.end(JSON.stringify(data));
                    })
                    .catch(error => {
                        res.end(JSON.stringify(error));
                    })
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
                const response = recipeModel.createRecipe(req.body);
                response
                    .then(data => {
                        res.end(JSON.stringify(data));
                    })
                    .catch(error => {
                        res.end(JSON.stringify(error));
                    })
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
                const response = recipeModel.updateRecipe(req.body);
                
                reponse
                    .then(data => {
                        res.end(JSON.stringify(data));
                    })
                    .cathc(error => {
                        res.end(JSON.stringify(error));
                    })
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
