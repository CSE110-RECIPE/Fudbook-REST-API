const admin = require('./FirebaseAdmin');
const fs =require('fs');

/** Pre-set Ingredients */
const in_RAW = fs.readFileSync('./src/file/ingredients.json', 'utf8');
const ingredient_list = JSON.parse(in_RAW);

/** Database Reference */
const dbRef = admin.database().ref();

const deleteRecipeFromBook = (uid, bookID, recipeID) => {

    const response = admin.auth().getUser(uid)
        .then(userRecord => {

            dbRef.child(`book/${bookID}/recipes/${recipeID}`).remove();

            return `User removed recipe from book.`;
        })
        .catch(error => {
            return error.message;
        });

    return response;
}

const createRecipe = (recipe) => {
    const response = admin.auth().getUser(recipe.uid)
    .then(userRecord => {
        const newRecipeKey = dbRef.child('recipe').push().key;

        var tags = [];
        var tagsUpdate = {};

        Object.keys(ingredient_list).forEach(key => {
            ingredient_list[key].forEach(item => {
                recipe.ingredients.forEach(in_item => {
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
        recipe['tags'] = tags;

        /** Upload the new recipe */
        dbRef.child('recipe/' + newRecipeKey ).set(recipe);

        dbRef.child('user/' + recipe.uid + '/personal')
            .once('value').then(snap => {
                const bookId = snap.val();

                dbRef.child('book/' + bookId + '/recipes').update({
                    [newRecipeKey]: newRecipeKey
                })
            });
        
        return {
            newRecipeKey: newRecipeKey,
            message: 'Recipe created.'
        };
    })
    .catch(err => {
        return {
            message: `POST request create recipe: `
                        + `User authentication failed.`};
    });

    return response;
}

const updateRecipe = (recipe) => {
    const response = admin.auth().getUser(recipe.uid)
        .then(val => {
            var updates = {};

            if (recipe.name && recipe.name !== '')
                updates[recipe.recipe_id + '/name'] 
                    = recipe.name;

            if (recipe.categories 
                    && recipe.categories.length !== 0 )
                updates[recipe.recipe_id + '/categories'] 
                    = recipe.categories;
            
            if (recipe.steps && recipe.steps.length !== 0 )
                updates[recipe.recipe_id + '/steps'] 
                    = recipe.steps;

            if (recipe.image && recipe.image !== '')
                updates[recipe.recipe_id + '/image'] 
                    = recipe.image;

            dbRef.child('recipe').update(updates);

            return {
                message: `Recipe updated.`
            }
        })
        .catch(err => {
            return {
                message: `User error.`
            }
    });

    return response;
}

module.exports = {
    deleteRecipeFromBook: deleteRecipeFromBook,
    createRecipe: createRecipe,
    updateRecipe: updateRecipe
};