# TESTING SESSION 2[current]:

## Errors I noted:

### Some requests require more than one element while one should be okay
- Interestingly, it seems like some requests that require lists don't work unless multiple elements are specified.
- We `one_arg_test.py` as an example.
- Note that `bad_response` in `one_arg_test.py` gets the `Unexpected token < in JSON at position 0` error that we were seeing.

## Other things:
- I think I mentioned this to you on Thursday, but deleting a recipe from the database does not delete that recipe's entry in the ingredients database. In for example, in `recipe_test.py` the recipe ID will remain in the `cheese` ingredient list (on Firebase) even after deletion. I think you mentioned this was okay, but I just wanted to remind you to double-check.



# TESTING SESSION 1 [outdated]:

## Errors I noted:

### The filter algorithm seems like it doesn't work yet
- Check `recipe_filter_test.py`
- This test filters to include chicken and exclude beans, but I get some recipes that don't match This

### Making a recipe edit request produces strange results in the database if given an invalid recipe_id
- Check `recipe_test.py`
- This test first creates a recipe (which seems to work okay, except the recipe_id in the database is a weird hash)
- Then, if you make a recipe edit request with an invalid recipe_id (in my case, `''`), it still pushes to the database
- It basically creates a recipe without an ID, so the recipe goes directly into the recipe level (try it out if you don't know what I mean)

# Other things:
- Is there a way to obtain a recipe directly from the database? It seems like the GET `/recipe/book` is used for this, but...
- Is there a way to get a `recipe_id` after directly creating a recipe? It seems like the only way to get it would be using a GET `/recipe/filter` request, but that doesn't seem to be working yet.