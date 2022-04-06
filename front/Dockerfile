#syntax=docker/dockerfile:1

FROM node:14.17.1

WORKDIR /src

COPY package.json .

RUN npm install

COPY . .

CMD [ "npm", "start" ]