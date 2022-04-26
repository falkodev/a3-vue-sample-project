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
	make kill && NODE_ENV=development docker-compose up -d && make logs

prod:
	NODE_ENV=production docker-compose up -d --build && make logs

logs-mongo:
	docker logs vino-terr-mongo -f

logs-apos:
	docker logs vino-terr-apos -f

logs-vue:
	docker logs vino-terr-vue -f

logs:
	make logs-mongo & make logs-apos & make logs-vue

db-dump:
	mongo/scripts/dump.sh

db-restore:
	mongo/scripts/restore.sh

test:
	make kill && docker-compose up -d && docker-compose exec vino-terr-apos npm run test:coverage && make kill

test-watch:
	make kill && docker-compose up -d && docker-compose exec vino-terr-apos npm run test:coverage -- --watchAll && make kill

fixtures:
	docker-compose exec vino-terr-apos npm run fixtures
