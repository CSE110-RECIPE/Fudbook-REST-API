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

            res.end(JSON.stringify(recipe));
        });

    return Router;
}

module.exports = routes;