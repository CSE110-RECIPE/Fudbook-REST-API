import requests
import json

try:

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

    assert request.text == 'User created a recipe.', f'ADD RECIPE ERROR: \'{request.text}\''

    # EDIT RECIPE TEST
    edit_recipe = { 'uid' : 'Lajm0tmKJEhTHNGxVR6OsQR9rAZ2',
            'recipe_id' : '',
            'name' : 'Mac and Test',
            'ingredients' : ['cheese', 'mac', 'test'],
            'categories' :  ['cheese', 'bok choy'],
            'steps' : ['1. get some mac', '2. get some cheese', '3. test it up', '4. edit it up'],
            'image' : 'url_placeholder',
            'editor' : 'lady ladington'
            }

    request = requests.put(url = 'http://localhost:3000/recipe', data = edit_recipe)

    assert request.text == 'User edited a recipe.', f'EDIT RECIPE ERROR: \'{request.text}\''

    # DELETE RECIPE TEST
    

except AssertionError as e:
    print(e)