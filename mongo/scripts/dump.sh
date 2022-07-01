#!/bin/sh

MONGO_INITDB_ROOT_USERNAME=$(grep MONGO_INITDB_ROOT_USERNAME .env | cut -d '=' -f2)
MONGO_INITDB_ROOT_PASSWORD=$(grep MONGO_INITDB_ROOT_PASSWORD .env | cut -d '=' -f2)

docker-compose exec -T vino-terr-mongo sh -c "mongodump --authenticationDatabase admin -u $MONGO_INITDB_ROOT_USERNAME -p $MONGO_INITDB_ROOT_PASSWORD" && docker cp vino-terr-mongo:/dump/vino-terr-larzac/ ./mongo/backup/dump-$(date +"%FT%H%M")
