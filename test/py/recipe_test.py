import requests
import json
import time

def add_recipe_test():
    # ADD RECIPE TEST
    new_recipe = { 'uid' : 'Lajm0tmKJEhTHNGxVR6OsQR9rAZ2',
                   'name' : 'Mac and Test',
                   'ingredients' : ['cheese', 'mac', 'test'],
                   'categories' :  ['cheese'],
                   'steps' : ['1. get some mac', '2. get some cheese', '3. test it up'],
                   'image' : 'url_placeholder',
                   'author' : 'mr. testerson',
                   'editor' : 'mr. testerson'
                 }
 
    request = requests.post(url = 'http://localhost:3000/recipe', data = new_recipe)
    recipe_id = json.loads(request.text)['recipe_id']

    assert request.text != 'User created a recipe.', f'ADD RECIPE ERROR: \'{request.text}\''

    # GETTING RECIPE BACK TO MAKE SURE EVERYTHING MATCHES
    get_data = { 'recipes' : [ recipe_id ] }
    response = requests.get(url = 'http://localhost:3000/recipe/book', data = get_data)
    text = response.text
    stored_recipe = json.loads(response.text)

    assert new_recipe == stored_recipe, f'GET RECIPE ERROR: \'{request.text}\''

    print('Add recipe test pass. recipe_id:', recipe_id)

    return recipe_id


def edit_recipe_test(recipe_id):
    # EDIT RECIPE TEST
    edit_recipe = { 'uid' : 'Lajm0tmKJEhTHNGxVR6OsQR9rAZ2',
                    'recipe_id' : recipe_id,
                    'name' : 'Mac and Test',
                    'ingredients' : ['cheese', 'mac', 'test'],
                    'categories' :  ['cheese', 'bok choy'],
                    'steps' : ['1. get some mac', '2. get some cheese', '3. test it up', '4. edit it up'],
                    'image' : 'url_placeholder',
                    'editor' : 'lady ladington'
                  }

    request = requests.put(url = 'http://localhost:3000/recipe', data = edit_recipe)

    assert request.text == 'User edited a recipe.', f'EDIT RECIPE ERROR: \'{request.text}\''

    # GETTING RECIPE BACK TO MAKE SURE EVERYTHING MATCHES
    response = requests.get(url = 'http://localhost:3000/recipe', data = [ recipe_id ])

    stored_recipe = json.loads(request.text)

    assert edit_recipe == stored_recipe, f'GET RECIPE ERROR: \'{request.text}\''

def delete_recipe_test(recipe_id):
    pass

id = add_recipe_test()
edit_recipe_test(id)
delete_recipe_test(id)