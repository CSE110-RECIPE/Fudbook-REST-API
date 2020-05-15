const axios = require('axios');

describe('Branda Test', () => {

    it('Post Test', async() => {

        const options = {
            method: 'post',
            baseURL: 'http://localhost:3000',
            url: '/recipe',
            headers: {'Content-Type': 'application/json'},
            data: {
                name: "Jerome Powell",
                ingredients: ["Printer", "Cotton", "Specialized Ink", "beef"],
                image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.bloomberg.com%2Fnews%2Farticles%2F2019-02-08%2Fdoes-jay-powell-have-the-stock-market-s-back&psig=AOvVaw3Cnj-wX10cPG1yMBLT2Ore&ust=1589586005771000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCKDArsHDtOkCFQAAAAAdAAAAABAD",
                steps: ["When the bear goes roar", "BRRRRRRRRRRRRRRRRRRRRR"],
                author: "Lajm0tmKJEhTHNGxVR6OsQR9rAZ2",
                uid: "Lajm0tmKJEhTHNGxVR6OsQR9rAZ2",
                editor: ""
            }
        };

        const response = await axios(options);

        expect(response.data.message).toBe('User created a recipe.');

        const start = Date.now();

        while (Date.now() < start + 1000) {}

        const options2 = {
            method: 'get',
            baseURL: 'http://localhost:3000/',
            url: '/recipe/book',
            headers: {'Content-Type': 'application/json'},
            data: {
                recipes: [`${response.data.recipe_id}`]
            }
        };

        const response2 = await axios(options2);

        expect(response2.data[response.data.recipe_id].name).toBe('Jerome Powell');
    });
})