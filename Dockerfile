FROM ubuntu:latest
FROM node:latest
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
RUN apt-get update
RUN apt-get install g++
COPY . .
EXPOSE 8080
CMD [ "node", "index.js" ]