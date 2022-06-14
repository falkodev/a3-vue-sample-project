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
7. [Fixtures and defaults](#7)<br>
8. [CI/CD and deployments](#8)<br>

<a id="1"></a>

## 1 Context [&#x2B06;](#contents)

This app contains backend and frontend for Vinoways Territoire.

<a id="2"></a>

## 2 Architecture [&#x2B06;](#contents)

ApostropheCMS was chosen on the backend because it is an open-source CMS, enabling user management, models definition by
developers while content edited by non-technical users is displayed in rendered templates. It is using MongoDB as
database.

Vue is used for the frontend interactions in some pages. State management is Pinia, VueX successor.

Every part of the application is dockerized, with a healtcheck status.

<a id="3"></a>

## 3 Installation [&#x2B06;](#contents)

First, you need to have docker and docker-compose installed and launched on your machine. Then, it is quite easy;

- run `git clone `
- copy the file `.env.example` and name it `.env` (this file will contain passwords, and will be git-ignored, so don't
  try to commit it)
- in this `.env` file, create a password for `MONGO_INITDB_ROOT_PASSWORD` and another one
  for `MONGO_INITDB_USER_PASSWORD` (choose whatever you want, it does not matter because it will be only available in
  your machine) - do not modify `MONGO_INITDB_ROOT_USERNAME` and `MONGO_INITDB_USER_USERNAME`
- create `apos/config/local.yml` file, and add this content

```yml
mongoDB:
  dockerUri: mongodb://root:XXX@vino-terr-mongo:27017/vino-terr-YYY?authSource=admin
```

`XXX` being the content of `MONGO_INITDB_ROOT_PASSWORD` and `YYY` the syndicate name (most probably `larzac`)

- run `docker-compose up`

<a id="3-1"></a>

### 3.1 First time process [&#x2B06;](#contents)

The first time you run `docker-compose up`, all Docker images will be downloaded and built.

There is a dependency between the containers `vino-terr-apos` and `vino-terr-mongo`: the DB needs to be started to
enable the server to start (otherwise, Apostrophe does not have access to Mongo and is stuck). However, on the first
run, some time is spent to create database users. Apostrophe tries to connect to Mongo during a certain period of time,
but on the first run, this timeout expires before Mongo is ready to accept connections. So, read the logs and wait for
the user `app-admin` to be created. When it is done, the DB is ready. You can now kill the docker containers by
hitting `Ctrl + c` in your terminal or run `docker-compose stop` in another one. And run again `docker-compose up`
or `make dev-logs` as explained below. This time, the DB will start quickly, enabling the server to start correctly.

<a id="3-2"></a>

### 3.2 Usual process [&#x2B06;](#contents)

Run simply `make` to start on development mode. The CMS part is accessible on `http://localhost:8080`. For Vue, by
default, the npm script is `npm run build:watch` to serve Vue files as static assets for the CMS. As a consequence,
there is no Vue app available on localhost. However, when running with `npm run dev` in the `vue`, folder the Vue app is
launched on `http://localhost:3000` .

You can also look at the Makefile for other possible commands. The next section explains what commands to run.

<a id="4"></a>

## 4 Commands [&#x2B06;](#contents)

<a id="4-1"></a>

### 4.1 Main commands [&#x2B06;](#contents)

Run `docker-compose up` for production in Docker

- `docker-compose ps` for running instances.
- `docker-compose stop`
- `docker-compose build` to rebuild images
- `docker-compose exec container-name sh` to log into a container (i.e: `docker-compose exec vino-terr-apos sh` to log
  into the server container)

Additionally, there is a Makefile. Therefore, these commands are available:

- `make` will run a `docker-compose up` with NODE_ENV=development and hide logs
- `make dev-logs` will run a `docker-compose up` with NODE_ENV=development and display logs from Mongo, Apostrophe and
  Vue
- `make kill` will shutdown all containers quickly
- `make build` is also available to build containers after a new package is added in a package.json file (for server and
  client containers)
- `make rebuild` will force to download all images again, starting from scratch before building containers

Mongo outputs a lot of logs, and while this can be necessary to read them sometimes, most of the time it is too much
useless information. An advice is too run `make && make logs-apos & make logs-vue` in a terminal.

<a id="4-2"></a>

### 4.2 Other commands [&#x2B06;](#contents)

Some useful commands are `make db-dump` and `make db-restore` to save the database, and restore backup.

<a id="5"></a>

## 5 Backend Tools [&#x2B06;](#contents)

<a id="5-1"></a>

### 5.1 ApostropheCMS [&#x2B06;](#contents)

As explained previously, Apostrophe is a framework with REST APIs. Therefore, no need to create CRUD routes, as it is
handled by the framework.

<a id="5-1-1"></a>

#### 5.1.1 Data model [&#x2B06;](#contents)

Data models are defined by schemas in Apostrophe, also called piece types. These piece types are necessary to create
pieces, or items in the database.

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

- through `apiRoutes`
  methods (https://v3.docs.apostrophecms.org/reference/module-api/module-overview.html#apiroutes-self): for
  example `GET /api/v1/module-name/custom-route` with a `req` object as parameter
- through `routes` (https://v3.docs.apostrophecms.org/reference/module-api/module-overview.html#routes-self): it creates
  an Express route such as `/api/v1/module-name/custom-route` but with a `req` and `res` objects

There is also a `renderRoutes` function to feed Nunjucks templates with data returned by custom
functions (https://v3.docs.apostrophecms.org/reference/module-api/module-overview.html#renderroutes-self).

You can also "extend" existing routes or even
functions(https://v3.docs.apostrophecms.org/reference/module-api/module-overview.html#the-extension-pattern). For
example, the customer register process was lacking some meaningful error messages on the POST request: trying to create
an account with an existing email address or being minor would be rejected by Apostrophe with the same error message.

This was added to customize error messages:

```js
// in apos/modules/customer/index.js
extendRestApiRoutes(self) { // override existing default restApiRoutes made by Apostrophe
  return {
    // accessible on POST /api/v1/customer
    async post(_super, req) { // "_super" is the default function run by Apostrophe
      try {
        const { user } = self.apos.task.getAdminReq()
        req.user = user

        const newCustomer = await _super(req) // run the default function if no error
        return newCustomer
      } catch (error) {
        // catch and customize response for specific cases
        const err = error.message || error
        if (err.includes('E11000')) {
          throw self.apos.error(
            'invalid',
            req.t('apostrophe:registerPage.existingAccount'),
          )
        } else if (err.includes('birth')) {
          throw self.apos.error(
            'invalid',
            req.t('apostrophe:registerPage.invalidBirthDate'),
          )
        } else {
          // for other cases, reject with the same generic message used by Apostrophe
          throw self.apos.error('invalid')
        }
      }
    },
  }
},
```

<a id="5-2"></a>

### 5.2 Docker [&#x2B06;](#contents)

Docker containers have a `healthcheck` command to ensure they are running correctly. It is an ongoing process, checking
if the container replies on a regular basis.

You can check if a container is healthy by typing `docker-compose ps`

<a id="5-3"></a>

### 5.3 MongoDB [&#x2B06;](#contents)

The database process uses authentication. The image used for the dockerized Mongo accepts some environment variables:

- MONGO_INITDB_DATABASE
- MONGO_INITDB_ROOT_USERNAME
- MONGO_INITDB_ROOT_PASSWORD

With these, a `root` user for all databases is created when the Mongo image for Docker is launched the first time. This
enables authentication.

The Docker image can run scripts at the first initialization.<br>
For example, the script `db/scripts/init/01.add-user.sh` is copied into the image through the Dockerfile in the
folder `db`. It creates a user specifically for the `app` database. That is why the `.env` file is important, and
MONGO_INITDB_ROOT_USERNAME and MONGO_INITDB_USER_USERNAME should not be changed.

```Dockerfile
FROM mongo:5.0

COPY scripts/init/01.add-user.sh /docker-entrypoint-initdb.d/
```

If other scripts during the first init step are needed in the future, they should be placed in `db/scripts/init/` and
copied the same way in the Dockerfile.

Outside of the Docker network, the port exposed is 27018 (in order not to mess with existing MongoDB in the local
machine). Therefore, you can connect to GUI tools such as MongDB Compass or Robo 3T through `mongodb://localhost:27018`
and indicate in the authentication settings the `root` credentials.

To log into the container, you can run `docker-compose exec vino-terr-mongo bash` and then `mongo -u root`. Insert
the `root` password when it is asked and you have access to the mongo shell.

<a id="5-4"></a>

### 5.4 Swagger [&#x2B06;](#contents)

The backend routes are documented and exposed through the Swagger API on `http://localhost:8080/api-docs`.

<a id="5-5"></a>

### 5.5 Pino [&#x2B06;](#contents)

`Pino` is the logger used in the backend here because it is fast, reliable and easy to use.

Example of usage:

```js
self.apos.util.log('Backend application started on http://%s:%d', host, port)
```

<a id="6"></a>

## 6 Tests [&#x2B06;](#contents)

Tests are a mix of Jest on backend and frontend and E2E tests with Cypress on frontend.

They can be launched locally by running `npm run test` on root level or through Docker by running `make test`.

For cypress, run `npm run cy:open` to visualize tests. The CI version is available with `npm run cy:run`.

For a specific service:

- backend: run `make test-apos`
- frontend: run `make test-vue`

If a watch mode is needed during development:

- for backend: `docker-compose exec vino-terr-apos npm run test:watch` or `cd server && npm run test:watch`
- for frontend: `docker-compose exec vino-terr-vue npm run test:watch` or `cd client && npm run test:watch`

<a id="7"></a>

## 7 Fixtures and defaults [&#x2B06;](#contents)

A set of fixtures has been configured to start the application with fake data.

Locally, you can run `cd apos && npm run fixtures`. Through Docker (after the containers have started with `make`), the
command is `docker-compose exec vino-terr-apos npm run fixtures`.

For default values, such as activities, wine labels, ..., the command
is `docker-compose exec vino-terr-apos npm run defaults` or locally `cd apos && npm run defaults`.

<a id="8"></a>

## 8 CI/CD and deployments [&#x2B06;](#contents)

UAT and production environments are deployed to AWS Lightsail servers, executing docker-compose.

Here are the steps to deploy a release:
- upgrade package.json version
- create a new entry in CHANGELOG.md with this new version, the current date and a changes sum up
- create a MR on the target branch (e.g: larzac-uat to deploy on UAT for Larzac) with a commit starting with "Release v" and the defined version

This will trigger a pipeline that will :
- create a new release on Gitlab (available in https://gitlab.com/vino-vibes/vinoways-territoire/-/releases)
- run tests
- deploy the version to the AWS server following the configuration in the "deployment" folder in this repository
