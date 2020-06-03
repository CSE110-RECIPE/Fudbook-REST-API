const admin = require('./FirebaseAdmin');

/** Database Reference */
const dbRef = admin.database().ref();

const createBook = (book) => {
    const response = admin.auth().getUser(req.body.uid)
        .then( userRecord => {

            const newBookKey = dbRef.child('book').push().key;

            dbRef.child('book/' + newBookKey).set({
                name: book.name,
                recipes: book.recipes,
                author: book.uid,
                default: false
            });

            dbRef.child('user/' + book.uid + '/other').update({
                [newBookKey]: newBookKey
            });

            return {
                message: `Book created.`
            }
        })
        .catch( err => {
            return {
                message: `POST request create book: User authentication`
                            + ` failed.`
            };
        }); 

    return response;
}

const createNewUserBook = (uid) => {

    const response = admin.auth().getUser(uid)
        .then(val => {
            const newFavoriteKey = dbRef.child('book').push().key;
            const newPersonalBookKey = dbRef.child('book').push().key;

            dbRef.child('book/' + newFavoriteKey).set({
                name: "Favorite",
                recipes: [],
                author: uid,
                default: true
            });

            dbRef.child('book/' + newPersonalBookKey).set({
                name: "My Book",
                recipes: [],
                author: uid,
                default: true
            });
        
            dbRef.child('user/' + uid).set({
                favorite: newFavoriteKey,
                personal: newPersonalBookKey,
                other: []
            })
        
            return {
                message: `User books created.`
            }
        })
        .catch(err => {
            return {
                message: err.message
            }
        });

        return response;
}

const getUserBook = (uid) => {
    const reponse = dbRef.child('user/' + uid).once('value')
        .then(snap => {
            return snap.val();
        })
        .catch(error => {
            return {
                message: error.message
            }
        });

    return reponse;
}

const addRecipeToBook = (bookID, recipeIDList) => {
    var data = {};

    recipeIDList.forEach(recipeID => {
        data[`${recipeID}`] = recipeID;
    })

    const response = dbRef.child('book/' + bookID + '/recipes')
        .update(data)
        .then(success => {
            return {
                message: `user added recipes to book.`
            }
        })
        .catch(error => {
            return {
                message: error.message
            }
        });

    return response;
}

const deleteRecipeFromBook = (bookID, recipeID) => {
    const reponse = dbRef.child('book/' + bookID + '/' + recipeID).remove()
        .then(res => {
            return {
                message: `Recipe deleted`
            };
        })
        .catch(error => {
            return {
                message: error.message
            }
        });

    return response;
}

module.exports = {
    createBook: createBook,
    createNewUserBook: createNewUserBook,
    getUserBook: getUserBook,
    addRecipeToBook: addRecipeToBook,
    deleteRecipeFromBook: deleteRecipeFromBook
};