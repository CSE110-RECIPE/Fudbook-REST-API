const express = require('express');

const routes = (recipe, ingredient) => {
    const Router = express.Router();

    Router.route('/filterRecipe')
        .post((req, res) => {
            /**
             * req.body
             * {
             *      exclude_filter: string[],
             *      include_filter: string[]
             * }
             */

            var newRecipe = {};

            res.end(JSON.stringify(recipe));
        });

    Router.route('/getRecipe')
        .post((req, res) => {
            /**
             * req.body
             * {
             *    recipes: recipe_id[]
             * }
             */

            var newRecipe = {};

            req.body.recipes.forEach(id => {
                newRecipe[`${id}`] = recipe[`${id}`]
            });

            res.end(JSON.stringify(newRecipe));
        });

    return Router;
}

module.exports = routes;