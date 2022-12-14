#!/bin/sh

MONGO_INITDB_ROOT_USERNAME=$(grep MONGO_INITDB_ROOT_USERNAME .env | cut -d '=' -f2)
MONGO_INITDB_ROOT_PASSWORD=$(grep MONGO_INITDB_ROOT_PASSWORD .env | cut -d '=' -f2)

docker-compose exec -T sample-project-mongo sh -c "mongorestore --authenticationDatabase admin -u $MONGO_INITDB_ROOT_USERNAME -p $MONGO_INITDB_ROOT_PASSWORD" < "$(pwd)/mongo/backup/db.dump"
