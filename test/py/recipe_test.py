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

    time.sleep(2) # some wait time is required!

    # GETTING RECIPE BACK TO MAKE SURE EVERYTHING MATCHES
    get_data = { 'recipes' : [ recipe_id, recipe_id ] }
    response = requests.get(url = 'http://localhost:3000/recipe/book', data = get_data)
    text = response.text
    stored_recipe = json.loads(response.text)

    if stored_recipe[recipe_id]['steps'] == new_recipe['steps']:
        print(f'Create and search recipe tests PASS: *NOTE, TWO ELEMENT LIST REQUIRED (see README.md)')
    else:
        print('Search recipe test FAIL!')

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

    time.sleep(2) # some wait time is required!

    # GETTING RECIPE BACK TO MAKE SURE EVERYTHING MATCHES
    get_data = { 'recipes' : [ recipe_id, recipe_id ] }
    response = requests.get(url = 'http://localhost:3000/recipe/book', data = get_data)
    stored_recipe = json.loads(response.text)

    if stored_recipe[recipe_id]['steps'] == edit_recipe['steps']:
        print(f'Edit recipe test PASS: *NOTE, TWO ELEMENT LIST REQUIRED (see README.md)')
    else:
        print('Search recipe test FAIL!')

def delete_recipe_test(recipe_id):

    delete_data = {'uid' : 'Lajm0tmKJEhTHNGxVR6OsQR9rAZ2',
                   'recipe_id' : recipe_id }
    
    requests.delete(url = 'http://localhost:3000/recipe', data = delete_data)

    time.sleep(2) # some wait time is required!

    get_data = { 'recipes' : [ recipe_id, recipe_id ] }
    response = requests.get(url = 'http://localhost:3000/recipe/book', data = get_data).text
    dictionary_response = json.loads(response)

    if dictionary_response[recipe_id]['removed'] == 'true':
        print(f'Delete recipe test PASS')

id = add_recipe_test()
edit_recipe_test(id)
delete_recipe_test(id)