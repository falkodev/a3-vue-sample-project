#!/bin/sh

if [ "$NODE_ENV" = "production" ]
then
  node app.js
else
  npm run dev
fi
