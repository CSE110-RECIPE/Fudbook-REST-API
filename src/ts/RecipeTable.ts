interface recipe {
    name: string,
    image: string,
    ingredients: string[],
    categories: string[],
    steps: string[],
    author: string,
    editor: string
}

class RecipeTable {

    table = {};

    constructor() {

    }
}

export default RecipeTable;