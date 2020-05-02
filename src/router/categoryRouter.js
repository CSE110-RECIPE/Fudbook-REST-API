const express = require('express');
const request = require('../js/request');

const routes = () => {
    const Router = express.Router();

    Router.route('/category')
        .get((req, res) => {

            const options = {
                method: 'POST',
                header: {},
                body: {
                    category: req.body.category
                }
            };

            request.service(options, process.env.PORT3, res);
        });
    
    return Router;
}

module.exports = routes;