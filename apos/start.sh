#!/bin/sh

if [ "$NODE_ENV" = "development" ]
then
  npx nodemon --no-deprecation
else
  node app.js
fi
