#!/bin/sh

MONGO_INITDB_ROOT_USERNAME=$(grep MONGO_INITDB_ROOT_USERNAME .env | cut -d '=' -f2)
MONGO_INITDB_ROOT_PASSWORD=$(grep MONGO_INITDB_ROOT_PASSWORD .env | cut -d '=' -f2)

NOW=$(date +"%FT%H%M")

sudo mkdir -p ./mongo/backup/dump-$NOW && \
docker-compose exec -T vino-terr-mongo sh -c "mongodump --authenticationDatabase admin -u $MONGO_INITDB_ROOT_USERNAME -p $MONGO_INITDB_ROOT_PASSWORD" && \
sudo docker cp vino-terr-mongo:/dump/vino-terr-larzac/ ./mongo/backup/dump-$NOW && \
sudo mkdir -p ../../mongo/data/backup && \
sudo cp -r ./mongo/backup/dump-$NOW ../../mongo/data/backup
