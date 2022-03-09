#!/bin/sh

npm rebuild esbuild

if [ "$NODE_ENV" = "production" ]
then
  npm run build
else
  npm run build:watch
fi
