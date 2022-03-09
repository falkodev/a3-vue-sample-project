# Vinoways Territoire

<a id="contents"></a>

# Table of contents

1. [Context](#1)<br>
2. [Architecture](#2)
3. [Installation](#3)<br>
   3.1 [First time process](#3-1)<br>
   3.2 [Usual process](#3-2)
4. [Commands](#4)<br>
   4.1 [Main commands](#4-1)<br>
   4.2 [Other commands](#4-2)
5. [Backend Tools](#5)<br>
   5.1 [ApostropheCMS](#5-1)<br>
   &nbsp;&nbsp;&nbsp;&nbsp;5.1.1 [Data models](#5-1-1)<br>
   &nbsp;&nbsp;&nbsp;&nbsp;5.1.2 [Modules](#5-1-2)<br>
   5.2 [Docker](#5-2)<br>
   5.3 [MongoDB](#5-3)<br>
   5.4 [Swagger](#5-4)<br>
   5.5 [Pino](#5-5)<br>
6. [Tests](#6)<br>
7. [Fixtures](#7)<br>

<a id="1"></a>

## 1 Context [&#x2B06;](#contents)

This app contains backend and frontend for Vinoways Territoire.

<a id="2"></a>

## 2 Architecture [&#x2B06;](#contents)

ApostropheCMS was chosen on the backend because it is an open-source CMS, enabling multisite management, models definition by developers while content edited by non-technical users is displayed in rendered templates. It is using MongoDB as database.

Vue is used for the frontend interactions in some pages. State management is Pinia, VueX successor.

Every part of the application is dockerized, with a healtcheck status.

<a id="3"></a>

## 3 Installation [&#x2B06;](#contents)

First, you need to have docker and docker-compose installed and launched on your machine. Then, it is quite easy;

- run `git clone `
- copy the file `.env.example` and name it `.env` (this file will contain passwords, and will be git-ignored, so don't try to commit it)
- in this `.env` file, create a password for `MONGO_INITDB_ROOT_PASSWORD` and another one for `MONGO_INITDB_USER_PASSWORD` (choose whatever you want, it does not matter because it will be only available in your machine)
- still in this `.env` file, update `MONGO_DB` to match the password in it with `MONGO_INITDB_USER_PASSWORD` (between `mongodb://app-admin:` and `@vino-terr-mongo:27017/app`) and do not modify `MONGO_INITDB_ROOT_USERNAME` and `MONGO_INITDB_USER_USERNAME`
- run `docker-compose up`

<a id="3-1"></a>

### 3.1 First time process [&#x2B06;](#contents)

The first time you run `docker-compose up`, all Docker images will be downloaded and built.

There is a dependency between the containers `vino-terr-apos` and `vino-terr-mongo`: the DB needs to be started to enable the server to start (otherwise, Feathers does not have a Mongo connection and is stuck). However, the first time, database users will be created, it takes time, and the timeout on Feathers side expires. So, read the logs and wait for the user `app-admin` to be created. When it is done, the DB is ready. You can now kill the docker containers by hitting `Ctrl + c` in your terminal or run `docker-compose stop` in another one. And run again `docker-compose up` or `make` as explained below. This time, the DB will start quickly, enabling the server to start correctly.

<a id="3-2"></a>

### 3.2 Usual process [&#x2B06;](#contents)

Run simply `make` to start on development mode. The CMS part is accessible on `http://localhost:8080`. The Vue app on `http://localhost:3000` when running with `npm run dev`. However, by default, the npm script is `npm run build:watch` to serve Vue files as static assets for the CMS.

You can also look at the Makefile for other possible commands. The next section explains what commands to run.

<a id="4"></a>

## 4 Commands [&#x2B06;](#contents)

<a id="4-1"></a>

### 4.1 Main commands [&#x2B06;](#contents)

Run `docker-compose up` for production in Docker

- `docker-compose ps` for running instances.
- `docker-compose stop`
- `docker-compose build` to rebuild images
- `docker-compose exec container-name sh` to log into a container (i.e: `docker-compose exec vino-terr-apos sh` to log into the server container)

Additionally, there is a Makefile. Therefore, these commands are available:

- `make` will run a `docker-compose up` with NODE_ENV=development and display logs from all containers
- `make build` is also available to build containers after a new package is added in a package.json file (for server and client containers)
- `make rebuild` will force to download all images again, starting from scratch before building containers

<a id="4-2"></a>

### 4.2 Other commands [&#x2B06;](#contents)

Some useful commands are `make db-dump` and `make db-restore` to save the database, and restore backup.

<a id="5"></a>

## 5 Backend Tools [&#x2B06;](#contents)

<a id="5-1"></a>

### 5.1 ApostropheCMS [&#x2B06;](#contents)

As explained previously, Apostrophe is a framework with REST APIs. Therefore, no need to create CRUD routes, as it is handled by the framework.

<a id="5-1-1"></a>

#### 5.1.1 Data model [&#x2B06;](#contents)

Data models are defined by schemas in Apostrophe, also called piece types. These piece types are necessary to create pieces, or items in the database.

See https://v3.docs.apostrophecms.org/guide/pieces.html#pieces

<a id="5-1-2"></a>

#### 5.1.2 Modules [&#x2B06;](#contents)

Modules are the heart of a Apostrophe app. They handle REST routes:

- getAll -> `GET /api/v1/module-name/`
- getOne -> `GET /api/v1/module-name/:id`
- post -> `POST /api/v1/module-name/`
- patch -> `PATCH /api/v1/module-name/:id`
- put -> `PUT /api/v1/module-name/:id`
- delete -> `DELETE /api/v1/module-name/:id`

If you need a custom route, you could add 2 sorts of routes:

- through `apiRoutes` methods (https://v3.docs.apostrophecms.org/reference/module-api/module-overview.html#apiroutes-self): for example `GET /api/v1/module-name/custom-route` with a `req` object as parameter
- through `routes` (https://v3.docs.apostrophecms.org/reference/module-api/module-overview.html#routes-self): it creates an Express route such as `/api/v1/module-name/custom-route` but with a `req` and `res` objects

There is also a `renderRoutes` function to feed Nunjucks templates with data returned by custom functions (https://v3.docs.apostrophecms.org/reference/module-api/module-overview.html#renderroutes-self).

<a id="5-2"></a>

### 5.2 Docker [&#x2B06;](#contents)

Docker containers have a `healthcheck` command to ensure they are running correctly. It is an ongoing process, checking if the container replies on a regular basis.

You can check if a container is healthy by typing `docker-compose ps`

<a id="5-3"></a>

### 5.3 MongoDB [&#x2B06;](#contents)

The database process uses authentication. The image used for the dockerized Mongo accepts some environment variables:

- MONGO_INITDB_DATABASE
- MONGO_INITDB_ROOT_USERNAME
- MONGO_INITDB_ROOT_PASSWORD

With these, a `root` user for all databases is created when the Mongo image for Docker is launched the first time. This enables authentication.

The Docker image can run scripts at the first initialization.<br>
For example, the script `db/scripts/init/01.add-user.sh` is copied into the image through the Dockerfile in the folder `db`. It creates a user specifically for the `app` database.
That is why the `.env` file is important, and MONGO_INITDB_ROOT_USERNAME and MONGO_INITDB_USER_USERNAME should not be changed.

```Dockerfile
FROM mongo:5.0

COPY scripts/init/01.add-user.sh /docker-entrypoint-initdb.d/
```

If other scripts during the first init step are needed in the future, they should be placed in `db/scripts/init/` and copied the same way in the Dockerfile.

Outside of the Docker network, the port exposed is 27018 (in order not to mess with existing MongoDB in the local machine). Therefore, you can connect to GUI tools such as MongDB Compass or Robo 3T through `mongodb://localhost:27018` and indicate in the authentication settings the `root` credentials.

To log into the container, you can run `docker-compose exec vino-terr-mongo bash` and then `mongo -u root`. Insert the `root` password when it is asked and you have access to the mongo shell.

<a id="5-4"></a>

### 5.4 Swagger [&#x2B06;](#contents)

The backend routes are documented and exposed through the Swagger API on `http://localhost:8080/api-docs`.

![swagger](server/public/swagger.png)

<a id="5-5"></a>

### 5.5 Pino [&#x2B06;](#contents)

`Pino` is the logger used in the backend here because it is fast, reliable and easy to use.

Example of usage:

```js
  self.apos.util.logself.apos.util.log('ready')self.apos.util.log('ready')self.apos.util.log('ready')self.apos.util.log('ready')self.apos.util.log('ready')self.apos.util.log('ready')self.apos.util.log('ready')self.apos.util.log('ready')('Backend application started on http://%s:%d', host, port)
```

<a id="6"></a>

## 6 Tests [&#x2B06;](#contents)

Tests are a mix of Jest on backend and frontend and E2E tests with Cypress on frontend.

They can be launched locally by running `npm run test` on root level or through Docker by running `make test`

For a specific service:

- backend: run `make test-backend`
- frontend: run `make test-frontend`

If a watch mode is needed during development:

- for backend: `docker-compose exec vino-terr-apos npm run jest:watch` or `cd server && npm run jest:watch`
- for frontend: `docker-compose exec vino-terr-vue npm run jest:watch` or `cd client && npm run jest:watch`

<a id="7"></a>

## 7 Fixtures [&#x2B06;](#contents)

A set of fixtures has been configured to start the application with fake data.

Locally, you can run `cd server && npm run fixtures`.
Through Docker (after the containers have started with `make`), the command is `docker-compose exec vino-terr-apos npm run fixtures`.

For a specific fixtures to be launched, you can run `docker-compose exec vino-terr-apos npm run fixtures:users` for example, or `node -e 'require(\"./modules/@apostrophecms/user/fixtures\").main()'`.
