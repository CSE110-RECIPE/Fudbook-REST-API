#!/bin/bash

if [ "$1" = "production" ]
then
    echo 'Production mode'

    PORT=3000 node ./index.js
    
elif [ "$1" = "development" ]
then
    echo "Development mode"

    PORT=3000 nodemon
fi
