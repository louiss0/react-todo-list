FROM node:16-alpine

WORKDIR /app

RUN npm i -g npm@latest 

ENTRYPOINT [ "npm" ]