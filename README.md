# Fudbook REST API

One Paragraph of project description goes here

## Prerequisites

Software Requirements
1. Nodejs
2. Node Package Mananger (npm)

## Getting Started

These instructions will get you a copy of the project up and running on your 
local machine for development and testing purposes. 

1. Fork this project and download to your local machine
2. Go to the directory
3. Run npm i
4. Run npm start (The server should start without warnings and errors)

## Built With

1. Firebase
2. Nodejs
3. Expressjs

## Documentation

### Default Headers

Content type: JSON

All request bodies are in JSON. Also remember to stringify your JSON before sending any request.

### Routes Overview

1. Recipe Request
    * Route `/recipe` 
        * [POST](__POST__-`/recipe`)
        * PUT 
        * DELETE
    * Route `/recipe/filter` GET
    * Route `/recipe/book` GET DELETE

## 1. Recipe Request

### Route /recipe

__POST__ `/recipe`

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

PUT request

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

DELETE request

Delete a recipe

Request body:
```
{
    "uid": string
    "recipe_id": string
}
```

### Route /recipe/filter

GET request

Retrieve recipes matching the filter

Request body:
```
{
    "exclude_filter": string[],
    "include_filter": string[],
}
```

### Route /recipe/book

GET request

Retrieve a list of recipes

Request body:
```
{
    recipes: recipe_id[]
}
```

DELETE request

Remove a recipe from a book

Request body:
```
{
    "uid": string,
    "book_id": string,
    "recipe_id": string
}
```