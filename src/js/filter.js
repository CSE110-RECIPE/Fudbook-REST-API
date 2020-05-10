/** Filter recipe algorithm */
module.exports = (ingredients, recipes, include_filter, exclude_filter) => {
    //check whether filters exists   
    if(include_filter.length == 0 && exclude_filter.length == 0)
    {
      return recipes;
    }

    //if include filter is empty, then perform exclude on all recipes
    if(include_filter.length == 0)
    {
      const keys = Object.keys(recipes);
      recipeArr = keys.map(Number);
      recipeList = exclude(ingredients,recipeArr, exclude_filter);
      return recipeList;
    }

    var recipeList = {}
    //add common recipes using include filter
    recipeList = include(ingredients, recipeList, include_filter);

    var recipeArr = Object.values(recipeList);
    //remove recipes using exclude filter
    if(exclude_filter.length != 0)
    {
      recipeList = exclude(ingredients, recipeArr, exclude_filter);
    }
    
    return recipeList;
}

/**Search for recipe algorithm */
const binary_search = (id, List) => {
    begin = 0;
    end = List.length;
    while(begin < end)
    {
      m = parseInt((begin+end)/2);
      if(List[m][1] == id)
      {
        return true;
      }
      else if (id < List[m][1])
      {
          end = m;
      }
      else
      {
          begin = m+1;
      }
    }
    return false;
}

/**Adds recipes using include filter */
const include = (ingredients, recipeList, include_filter) => {
    //initialize list with first ingredient's recipes
    for(var i=0; i<ingredients[include_filter[0]].length; i++)
    {
      var recipeNum = ingredients[include_filter[0]][i][1];
      recipeList[recipeNum] = recipeNum;
    }

    //find recipes that share common ingredients and remove duplicates
    for(var i=1; i<include_filter.length; i++)
    {
        const tempList = ingredients[include_filter[i]];
        const intersect = {};
        //go through each ingredient's recipes and add to list
        for(var j=0; j< tempList.length; j++)
        {
          if(tempList[j][1] in recipeList)
          {
            recipeNum = tempList[j][1];
            intersect[recipeNum] = recipeNum;
          }
        }
        recipeList = intersect;
    }
    return recipeList;
}

/**Removes recipes using exclude filter*/
const exclude = (ingredients, recipeArr, exclude_filter) => {
  //remove recipes with any ingredients in exclude_filter
    for(var i=0; i<exclude_filter.length; i++)
    {
      //get list of recipes that contains this specific ingredient
      const excludeList = ingredients[exclude_filter[i]];
      const validRecipes = {};
      for(var j=0; j<recipeArr.length; j++)
      {
        if(!(binary_search(recipeArr[j], excludeList)))
        {
          validRecipes[recipeArr[j]] = recipeArr[j];
        }
      }
      var List = validRecipes;
      recipeArr = Object.values(List);
    }
    return List;
}