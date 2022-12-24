#!/bin/bash
FROM node:latest

ENV PUPPETEER_SKIP_DOWNLOAD=true
ENV VOLUME_PATH=/juche

WORKDIR /src

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD npm start
