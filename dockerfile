# 依赖的镜像
FROM node:latest

RUN mkdir -p /home/www/shorturl
WORKDIR /home/www/shorturl

COPY . /home/www/shorturl

RUN rm -rf ./node_modules package-lock.json yarn.lock && npm install
#暴露端口给宿主机
EXPOSE 3000
