#!/bin/sh

if [ "$NODE_ENV" = "development" ]
then
  nodemon --no-deprecation
else
  node app.js
fi
