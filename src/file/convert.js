const fs = require('fs');

var text = '';

const ingredientsRAW = fs.readFileSync('./src/file/ingredients.json');
const ingredientsJSON = JSON.parse(ingredientsRAW);

Object.keys(ingredientsJSON).forEach(key => {
    ingredientsJSON[key].forEach(item => {
        text = text + item + ' ';
    })
})

fs.writeFileSync('./ingredients.txt', text);

process.exit(1);