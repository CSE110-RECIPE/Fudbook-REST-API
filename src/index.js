const express = require('express');
const fs = require('fs');

const recipeRouter = require('./router/recipeRouter');
const bookRouter = require('./router/bookRouter');

/**
 * Initialize express instance
 */
const app = express();

/* Middleware setup */
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use('/', recipeRouter());
app.use('/', bookRouter());

/*******************************************************************************
 * Activates port
 ******************************************************************************/
app.listen(process.env.PORT, () => {
    console.log(`Server running on PORT:${process.env.PORT}.`);
    console.log(`Click the link to open the server` +
        ` https://localhost:${process.env.PORT}`);
})