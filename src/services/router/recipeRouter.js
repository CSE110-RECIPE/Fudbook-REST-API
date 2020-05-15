const filter = require('../../js/filter');

const routes = (app, recipe, ingredient) => {
    app.post('/filterRecipe', (req, res) => {
        /**
         * req.body
         * {
         *      exclude_filter: string[],
         *      include_filter: string[]
         * }
         */
    
        // the algorithm returns matching key value and element.
    
         var newRecipe = filter(ingredient, recipe,
            req.body.include_filter, req.body.exclude_filter);
    
        res.end(JSON.stringify(newRecipe));
    });
    
    app.post('/getRecipe', (req, res) => {
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
}

module.exports = routes;