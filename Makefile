start: dev-logs

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
	make kill && NODE_ENV=development docker-compose up -d --remove-orphans

dev-logs:
	make kill && NODE_ENV=development docker-compose up -d && make logs

prod:
	NODE_ENV=production docker-compose -f docker-compose.remote.yml --compatibility up -d --build

local-prod:
	make kill && \
	cp apos/modules/content/ui/src/scss/_settings.scss vue/src/assets/settings.scss && \
  npm run build --prefix vue && \
  rm -rf apos/public/vue-app && \
  mkdir -p apos/public/vue-app && \
  cp -R vue/dist/* apos/public/vue-app && \
  NODE_ENV=production docker-compose -f docker-compose.remote.yml --compatibility up -d --build && make logs

logs-mongo:
	docker logs sample-project-mongo -f

logs-apos:
	docker logs sample-project-apos -f

logs-vue:
	docker logs sample-project-vue -f

logs:
	make logs-apos & make logs-vue

db-dump:
	mongo/scripts/dump.sh

db-restore:
	mongo/scripts/restore.sh

test:
	make kill && docker-compose up -d && docker-compose exec sample-project-apos npm run test:coverage && make kill

test-watch:
	make kill && docker-compose up -d && docker-compose exec sample-project-apos npm run test:coverage -- --watchAll && make kill

fixtures:
	docker-compose exec sample-project-apos npm run fixtures

defaults:
	docker-compose exec sample-project-apos npm run defaults
