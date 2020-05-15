import requests
import json

url = 'http://localhost:3000/recipe/filter'
data = { 'exclude_filter': [ 'pasta', 'lamb' ],
         'include_filter': [ 'bacon', 'beans' ] }

raw_response = requests.get(url = url, data = data)
response = raw_response.text

try:
    print(f'Response: {response}')
    recipe_dict = json.loads(response)
    for recipe_id, recipe in recipe_dict.items():
        assert 'chicken' in recipe['tags'], f'Chicken not in returned recipe {recipe_id}'
        assert 'beans' not in recipe['tags'], f'Beans in returned recipe {recipe_id}'
except AssertionError as e:
    print(e)