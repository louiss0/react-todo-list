FROM node:16-alpine

WORKDIR /app

COPY ./app/package.json .

RUN npm i 

COPY ./app .

EXPOSE 8080/

CMD [ "npm", "start" ]