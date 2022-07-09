FROM node:latest

WORKDIR /saybis-node

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD npm start
