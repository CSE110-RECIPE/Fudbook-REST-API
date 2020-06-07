const express = require('express');
const filter = require('../../js/filter');

const routes = (dbRef, container) => {
    const Router = express.Router();

    Router.route('/topRecipe')
      .get((req, res) => {
        res.end(JSON.stringify({topRecipe: container.recipe[69]}));
      })

    Router.route('/filterRecipe')
      .post((req, res) => {
        /**
         * req.body
         * {
         *      exclude_filter: string[],
         *      include_filter: string[]
         * }
         */
    
        // the algorithm returns matching key value and element.
    
        var newRecipe = filter(container.ingredient, container.recipe,
            req.body.include_filter, req.body.exclude_filter);

    
        res.end(JSON.stringify(newRecipe));
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
            newRecipe[`${id}`] = container.recipe[`${id}`]
        });
    
        res.end(JSON.stringify(newRecipe));
      });

    Router.route('/')
      .delete((req, res) => {
        /**
         * req.body
         * {
         *    "uid": string,
         *    "recipe_id": string
         * }
         */
      
        if (req.body.uid === container.recipe[req.body.recipe_id].author) {
          var ingredientUpdate = {}
      
          container.recipe[req.body.recipe_id].tags.forEach(i => {
            Object.keys(container.ingredient[i]).forEach(jKeys => {
              if (container.ingredient[i][jKeys] === req.body.recipe_id)
                ingredientUpdate[i + '/' + jKeys] = null;
            });
          });
      
          dbRef.child('ingredient').update(ingredientUpdate);
      
          dbRef.child('recipe/' + req.body.recipe_id).set({removed: true});
      
          res.end(JSON.stringify({message: `${req.body.recipe_id} has been removed`}));
      
        } else {
          res.end(JSON.stringify({message: 'User unauthorized: req.body.uid does not match.'}));
        }
      });

    return Router;
}

module.exports = routes;