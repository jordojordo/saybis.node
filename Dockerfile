FROM node:latest

ENV PUPPETEER_SKIP_DOWNLOAD=true

WORKDIR /src

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD npm start
