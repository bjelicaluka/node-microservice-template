FROM node:12-alpine AS build
WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run test

RUN npm run build

FROM node:12-alpine
WORKDIR /app

COPY --from=build app/package*.json ./
COPY --from=build app/build ./

RUN npm ci --production

CMD ["node", "src"]