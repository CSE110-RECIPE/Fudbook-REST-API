// import library
const express = require('express');

const server = express();

server.use(express.json());

// https://localhost:3000/name
server.get('/', (req, res) => {
    // user information
    console.log(req.body);

    // server response
    res.end('Hi there');
});

server.post('/user_preference', (req, res) => {
    console.log(req.body);

    res.end('POST request');
});

server.post('/recipe', (req, res) => {
    console.log(req.body);

    //TODO

    res.end('recipe updated');
})


server.delete('/', (req,res) => {
    res.send('DELETE request');
})

server.listen(process.env.PORT, () => {
    console.log('servering');
})


// Your server gets called
// Your server looks for the matching HTTP request
// Your server is going to run precondition code, AKA middleware
// Your runs HTTP request