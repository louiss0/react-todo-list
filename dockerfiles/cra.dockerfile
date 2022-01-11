FROM node:16-alpine

WORKDIR /app

RUN npm i -g npm@latest

RUN npm i -g create-react-app


ENTRYPOINT [ "create-react-app" ]