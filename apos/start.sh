#!/bin/sh

if [ "$NODE_ENV" = "development" ]
then
  npx nodemon --no-deprecation
else
  npm run prod
fi
