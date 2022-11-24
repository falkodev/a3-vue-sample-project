#!/bin/sh

MONGO_INITDB_ROOT_USERNAME=$(grep MONGO_INITDB_ROOT_USERNAME .env | cut -d '=' -f2)
MONGO_INITDB_ROOT_PASSWORD=$(grep MONGO_INITDB_ROOT_PASSWORD .env | cut -d '=' -f2)

NOW=$(date +"%FT%H%M")

sudo mkdir -p ./mongo/backup/dump-$NOW && \
docker-compose exec -T sample-project-mongo sh -c "mongodump --authenticationDatabase admin -u $MONGO_INITDB_ROOT_USERNAME -p $MONGO_INITDB_ROOT_PASSWORD" && \
sudo docker cp sample-project-mongo:/dump/sample-project-region/ ./mongo/backup/dump-$NOW && \
sudo mkdir -p ../../mongo/data/backup && \
sudo cp -r ./mongo/backup/dump-$NOW ../../mongo/data/backup
