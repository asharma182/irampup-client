FROM node:10.15.0-alpine

WORKDIR /app

USER root

RUN npm install http-server -g

COPY . /app

EXPOSE 8080

CMD http-server