import requests
import json
import time

recipe_name = '-M7LYevf7eTBLvSiepXm'
good_response = requests.get(url = 'http://localhost:3000/recipe/book', data = { 'recipes' : [ recipe_name, recipe_name, '0' ] } )
bad_response = requests.get(url = 'http://localhost:3000/recipe/book', data = { 'recipes' : [ recipe_name ] } )

print(json.dumps(json.loads(good_response.text), indent=4))
print(bad_response.text)