# 依赖的镜像
FROM node:latest

RUN mkdir -p /home/www/shorturl
WORKDIR /home/www/shorturl

COPY . /home/www/shorturl

RUN npm install && npm start