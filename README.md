# Project template for future microservices in Node.js.

### Version: <strong>`1.0.1`</strong>
<br/>

<h1>Steps to run this project in development environment:</h1>

1. Run `npm i` command
2. Export required env vars
```bash
export NODE_ENV='development'
export DOC_PATH='swagger'
export JWT_SECRET='not so super secret content'
export USER_SERVICE_URL='http://local-user-service-url'
export DB_USER='root'
export DB_PASSWORD='1234'
export REDIS_PASSWORD='1234'
```
3. Add the following content to `CONFIG` env var for the development environment
```json
{
  "database": {
    "type": "sqlite",
    "database": "./database.sql"
  },
  "redis": {
    "port": 6379,
    "host": "localhost"
  }
}
```
Example using quotes:
```bash
export CONFIG='{
  "database": {
    "type": "sqlite",
    "database": "./database.sql"
  },
  "redis": {
    "port": 6379,
    "host": "localhost"
  }
}'
```
4. Run `npm start` command

<h1>Steps to run in production environment using npm:</h1>

1. Run `npm i` command
2. Run `npm run build` command
3. Run `npm ci --production` command
4. Export required env vars
```bash
export NODE_ENV='production'
export DOC_PATH='swagger'
export JWT_SECRET='super secret content'
export USER_SERVICE_URL='http://user-service-url'
export DB_USER='admin'
export DB_PASSWORD='MDBP@sWoRd'
export REDIS_PASSWORD='R3d1sP@sWoRd'
```
5. Add the following content to `CONFIG` env var for the production environment
```json
{
  "database": {
    "type": "mysql",
    "host": "localhost",
    "port": 3306,
    "database": "db_name"
  },
  "redis": {
    "port": 6379,
    "host": "localhost"
  }
}
```
Example using quotes:
```bash
export CONFIG='{
  "database": {
    "type": "mysql",
    "host": "localhost",
    "port": 3306,
    "database": "db_name"
  },
  "redis": {
    "port": 6379,
    "host": "localhost"
  }
}'
```
6. Run `node build/src` command

<h1>Steps to run in production environment using Docker:</h1>

1. Run the following command to build the Docker Image
```bash
docker build -t <image-name>:<tag> .
```
2. Set the `CONFIG` env var for production environment
```bash
export CONFIG='{
  "database": {
    "type": "mysql",
    "host": "localhost",
    "port": 3306,
    "database": "db_name"
  },
  "redis": {
    "port": 6379,
    "host": "localhost"
  }
}'
```
3. Run the following command to run a Docker Container
```bash
docker run -dp <port>:80 \
  -e NODE_ENV='production' \
  -e DOC_PATH='swagger' \
  -e JWT_SECRET='super secret content' \
  -e USER_SERVICE_URL='http://user-service-url' \
  -e DB_USER='root' \
  -e DB_PASSWORD='1234' \
  -e REDIS_PASSWORD='1234' \
  -e CONFIG \
  <image>:<tag>
```

<h1>Steps to run in any environment using Docker Compose:</h1>

1. Configure docker-compose.yml to suit the environment needs
2. Run any of the following commands
```bash
# using old docker-compose CLI
docker-compose up
# using new built-in docker compose CLI
docker compose up
# run in a detached mode
docker compose up -d
```

<h1>Steps to run inside a Kubernetes cluster using kubectl:</h1>

1. Configure kubernetes.yml to suit the environment needs
2. Run the following command(s)
```bash
# run it inside the default namespace
kubectl apply -f kubernetes.yml

# run it inside a separate namespace
kubectl create namespace <namespace-name>
kubectl apply -f kubernetes.yml -n <namespace-name>
```

<h1>Used environment variables</h1>

| Env variable | Description | Example | Default |
| :--- | :--- | :--- | :--- |
| <b>PORT | HTTP server listen port | `3000` | `80` |
| <b>NODE_ENV | Node configuration environment | `production`/`development` | `development` |
| <b>DOC_PATH | Path of Swagger API doc | `api-docs` | `swagger` |
| <b>JWT_SECRET | JWT Secret | `5IUSD123JKJASA` | `TOKEN` |
| <b>USER_SERVICE_URL | URL of remote service | `http://url-to-service` | `null` |
| <b>DB_USER | Database user | `admin` | `root` |
| <b>DB_PASSWORD | Database password | `pwd123` | `null` |
| <b>REDIS_PASSWORD | Redis password | `redpwd123` | `null` |
| <b>CONFIG | Additional configuration in JSON string format | `{database: {...}, redis: {...}}` | `null` |

<br/>

<h1>Useful documentation links for third party libs.</h1>

| Lib | Description | URL |
| :--- | :--- | :--- |
| <b>TypeScript | Statically typed language on top of JavaScript. | https://www.typescriptlang.org/docs/ |
| <b>Inversify.js | IoC container for JavaScript. | https://inversify.io/ |
| <b>so<span>cket.io</span> | WebSocket lib for JavaScript.| https://socket.io/ |
| <b>Redis | JavaScript client lib for Redis. | https://redis.io/ |
| <b>Express | Node.js HTTP server. | https://expressjs.com/ |
| <b>Mocha | JavaScript testing library. | https://mochajs.org/ |
| <b>Chai | JavaScript assertion library. | https://www.chaijs.com/ |
| <b>Sinon | Standalone test spies, stubs and mocks for JavaScript. | https://sinonjs.org/ |
| <b>Express Validator | Validation middleware for Express. | https://express-validator.github.io/docs/ |

<br/>