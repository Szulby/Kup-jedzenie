#syntax=docker/dockerfile:1

FROM node:14.17.1

WORKDIR /src

COPY . .

RUN npm install

CMD [ "npm", "start" ]