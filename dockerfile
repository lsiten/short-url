# 依赖的镜像
FROM node:12

RUN mkdir -p /home/www/shorturl
WORKDIR /home/www/shorturl

COPY . /home/www/shorturl

RUN npm install
#暴露端口给宿主机
EXPOSE 3000
CMD npm run start
