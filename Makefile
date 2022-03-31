start: dev

stop:
	docker-compose stop

ps:
	docker-compose ps

kill:
	docker-compose kill

build:
	NODE_ENV=development docker-compose build

rebuild:
	NODE_ENV=development docker-compose build --no-cache

dev:
	make kill && NODE_ENV=development docker-compose up -d

dev-logs:
	make kill && NODE_ENV=development MONGO_INITDB_DATABASE=vino-terr-larzac docker-compose up -d && make logs

prod:
	NODE_ENV=production MONGO_INITDB_DATABASE=vino-terr-larzac docker-compose up -d --build && make logs

logs-mongo:
	docker logs vino-terr-mongo -f

logs-apos:
	docker logs vino-terr-apos -f

logs-vue:
	docker logs vino-terr-vue -f

logs:
	make logs-mongo & make logs-apos & make logs-vue

db-dump:
	db/scripts/dump.sh

db-restore:
	db/scripts/restore.sh

test:
	make kill && NODE_ENV=test docker-compose up -d && docker-compose exec vino-terr-apos npm run test && make kill

