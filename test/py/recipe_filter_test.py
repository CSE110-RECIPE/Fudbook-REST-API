import requests
import json

url = 'http://localhost:3000/recipe/filter'
data = { 'exclude_filter': [ 'beans' ],
         'include_filter': [ 'chicken' ] }

raw_response = requests.get(url = url, data = data)
response = raw_response.text

try:
    for recipe_id, recipe in response.items():
        assert 'chicken' in recipe['tags'], f'Chicken not in returned recipe {recipe_id}'
        assert 'beans' not in recipe['tags'], f'Beans in returned recipe {recipe_id}'
except AssertionError as e:
    print(e)