#!/bin/sh
MONGO_INITDB_USER_USERNAME=$(grep MONGO_INITDB_USER_USERNAME .env | cut -d '=' -f2)
MONGO_INITDB_USER_PASSWORD=$(grep MONGO_INITDB_USER_PASSWORD .env | cut -d '=' -f2)

docker run --rm --link vino-terr-mongo:mongo --net vinoways-territoire_default -v $(pwd)/mongo/backup:/backup mongo bash -c "mongodump --out /backup --host mongo --db vino-terr -u $MONGO_INITDB_USER_USERNAME -p $MONGO_INITDB_USER_PASSWORD"
