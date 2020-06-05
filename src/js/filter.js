/** Filter recipe algorithm */
module.exports = (ingredients, recipes, include_filter, exclude_filter) => {
    var recipeList = {};

    //check whether filters exists   
    if(include_filter.length == 0 && exclude_filter.length == 0)
    {
      return recipeList;
    }

    //if include filter is empty, then perform exclude on all recipes
    if(include_filter.length == 0)
    {
      recipeList = exclude(ingredients,recipes, exclude_filter);
      return recipeList;
    }

    //add common recipes using include filter
    recipeList = include(ingredients, recipes, include_filter);
    
    //remove recipes using exclude filter
    if(exclude_filter.length != 0)
    {
      recipeList = exclude(ingredients, recipeList, exclude_filter);
    }

    return recipeList;
}

/**Adds recipes using include filter */
const include = (ingredients, recipes, include_filter) => {
    //initialize list with first ingredient's recipes
    var ingr = include_filter[0];
    var recipeNum;
    var recipeList={};
    
    for(var key in ingredients[ingr])
    {
        recipeNum = ingredients[ingr][key];
        recipeList[recipeNum] = recipes[recipeNum];
    }

    //find recipes that share common ingredients and remove duplicates
    for(var i=1; i<include_filter.length; i++)
    {
        ingr = include_filter[i];
        const tempList = ingredients[ingr];
        const intersect = {};
        //go through each ingredient's recipes and add to list if common ingredient
        for(var key in tempList)
        {
          if(tempList[key] in recipeList)
          {
            recipeNum = tempList[key];
            intersect[recipeNum] = recipes[recipeNum];
          }
        }
        recipeList = intersect;
    }
    
    return recipeList;
}

/**Removes recipes using exclude filter*/
const exclude = (ingredients, recipeList, exclude_filter) => {
    var ingr;
    var recipeNum;
    var validList = {};
   
    //remove recipes with any ingredients in exclude_filter
    for(var i=0; i<exclude_filter.length; i++)
    {
      ingr = exclude_filter[i];

      //find valid recipes in recipeList and remove invalid ones
      Object.keys(recipeList).forEach(recipeKey => {

        recipeList[recipeKey].tags.forEach(item => {
          if (item !== ingr)
            validList[recipeKey] = recipeList[recipeKey];
        })
      })
    }

    recipeList = validList;

    return recipeList;
}