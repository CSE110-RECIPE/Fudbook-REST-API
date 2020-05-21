# Documentation

## Routes Overview

1. Recipe Request
    * Route `/recipe` 
        * [POST](#post-recipe)
        * [PUT](#put-recipe) 
        * [DELETE](#delete-recipe)
    * Route `/recipe/filter` 
        * [POST](#get-recipefilter)
    * Route `/recipe/book` 
        * [POST](#get-recipebook) 
        * [DELETE](#delete-recipebook)
2. Book Request
    * Route `/book`
        * [POST](#post-book)
        * [DELETE](#delete-book)
    * Route `/book/bookshelf`
        * [POST](#get-bookbookshelf)
    * Route `/book/newUser`
        * [POST](#post-booknewUser)

# Recipe Request

### POST `/recipe`

Add a new recipe to the database

__Content Type__: application/json

__Request body__:

```
{
    "uid": string,
    "name": string,
    "ingredients": string[],
    "steps": string[],
    "image": string,
    "author": string,
    "editor": string
}
```

__Response Type__: JSON

__Response Body__:

Success
```
{
    "recipe_id": string,
    "message": "User created a recipe."
}
```

Fail
```
"error message"
```

---

### PUT `/recipe`

Edit an existing recipe in the database 

__Content Type__: application/json

__Request body__:

```
{
    "uid": string,
    "recipe_id": string,
    "name": string,
    "ingredients": string[],
    "steps": string[],
    "image": string,
    "editor": string
}
```

__Response Type__: string

__Response Body__:

Success
```
"User edited a recipe."
```

Fail
```
"error message"
```

---

### DELETE `/recipe`

Removes an existing recipe from the database

__Content Type__: application/json

__Request body__:
```
{
    "uid": string
    "recipe_id": string
}
```

__Response Type__: string

__Response Body__:

Success
```
"User deleted a recipe."
```

Fail
```
"error message"
```

---

### POST `/recipe/filter`

Retrieve recipes in the database that matches the ingredient preferences

__Content Type__: application/json

__Request body__:
```
{
    "exclude_filter": string[],
    "include_filter": string[],
}
```

__Response Type__: json

__Response Body__:

Success
```
{
    "recipe_id": {
        "uid": string,
        "name": string,
        "ingredients": string[],
        "categories": string[],
        "steps": string[],
        "tags": string[],
        "image": string,
        "author": string,
        "editor": string
    }
    .
    .
    .
}
```

Fail
```
"error message"
```

---

### POST `/recipe/book`

POST request

Retrieve a list of recipes

__Content Type__: application/json

__Request body__:
```
{
    recipes: recipe_id[]
}
```

__Response Type__: json

__Response Body__:

Success
```
{
    "recipe_id": {
        "uid": string,
        "name": string,
        "ingredients": string[],
        "categories": string[],
        "steps": string[],
        "tags": string[],
        "image": string,
        "author": string,
        "editor": string
    }
    .
    .
    .
}
```

Fail
```
"error message"
```

---

### DELETE `/recipe/book`

Remove a recipe from a book

__Content Type__: application/json

__Request body__:
```
{
    "uid": string,
    "book_id": string,
    "recipe_id": string
}
```

__Response Type__: string

__Response Body__:

Success
```
"User removed recipe from book"
```

Fail
```
"error message"
```

---

# Book Request

### POST `/book`

Create a new book

__Content Type__: application/json

__Request body__:

```
{
    "name": string,
    "recipes": recipe_id[],
    "uid": string,
    "default": boolean
}
```

__Response Type__: string

__Response Body__:

Success
```
"User created new book."
```

Fail
```
"error message"
```

---

### DELETE `/book`

Deletes a book

__Content Type__: application/json

__Request body__:

```
{
    "uid": string,
    "book_id": string
}
```

__Response Type__: string

__Response body__:

Success
```
"User removed the book."
```

Fail
```
"User doesn't own the book"
```
---

### POST `/book/bookshelf`

Retrieves list of books from the database

__Content Type__: application/json

__Request body__:

```
{
    "bookshelf": book_id[]
}
```

__Response Type__: json

__Response Body__:

Success
```
{
    "book_id": {
        name: string,
        recipes: recipe_id[],
        uid: string,
        default: boolean
    }
}
```

Fail
```
"error message"
```

---

### POST `/book/newUser`

Initialize the user's book when the user is new

__Content Type__: application/json

__Request body__:

```
{
    "uid": string
}
```

__Response Type__: string

__Response Body__:

Success
```
"User bookshelf has been setup."
```

Fail
```
"error message"
```

---
