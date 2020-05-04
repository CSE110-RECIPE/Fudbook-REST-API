# Documentation

## Routes Overview

1. Recipe Request
    * Route `/recipe` 
        * [POST](#post-recipe)
        * [PUT](#put-recipe) 
        * [DELETE](#delete-recipe)
    * Route `/recipe/filter` 
        * [GET](#get-recipefilter)
    * Route `/recipe/book` 
        * [GET](#get-recipebook) 
        * [DELETE](#delete-recipebook)
        
### Default Headers
Content type: JSON
All request bodies are in JSON. Also remember to stringify your JSON before sending any request.


## 1. Recipe Request

### POST `/recipe`

Create a new recipe 

Request body:

```
{
    "uid": string,
    "name": string,
    "ingredients": string[],
    "categories": string[],
    "steps": string[],
    "image": string,
    "author": string,
    "editor": string
}
```

---

### PUT `/recipe`

Edit a recipe 

Request body:

```
{
    "uid": string,
    "recipe_id": string,
    "name": string,
    "ingredients": string[],
    "categories": string[],
    "steps": string[],
    "image": string,
    "editor": string
}
```

---

### DELETE `/recipe`

Delete a recipe

Request body:
```
{
    "uid": string
    "recipe_id": string
}
```

---

### GET `/recipe/filter`

Retrieve recipes matching the filter

Request body:
```
{
    "exclude_filter": string[],
    "include_filter": string[],
}
```

---

### GET `/recipe/book`

GET request

Retrieve a list of recipes

Request body:
```
{
    recipes: recipe_id[]
}
```

---

### DELETE `/recipe/book`

Remove a recipe from a book

Request body:
```
{
    "uid": string,
    "book_id": string,
    "recipe_id": string
}
```
