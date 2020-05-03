const express = require('express');

const routes = (category) => {
    const Router = express.Router();

    Router.route('/')
        .post((req, res) => {
            /**
             * req.body
             * {
             *      category: category_name[]
             * }
             */

            var catList = {}

            req.body.category.forEach(item => {
                catList[item] = category[item];
            });

            res.end(JSON.stringify(catList));
        })
    
    return Router;
}

module.exports = routes