#!/bin/bash

if [ "$1" = "production" ]
then
    echo 'Production mode'

    PORT=3000 node ./index.js
    
elif [ "$1" = "development" ]
then
    echo "Development mode"

    P0=3000
    P1=3001
    P2=3002

    PORT1=$P1 node ./src/services/recipe_service.js & \
        PORT2=$P2 node ./src/services/book_service.js & \
        PORT=$P0 PORT1=$P1 PORT2=$P2 nodemon
fi
