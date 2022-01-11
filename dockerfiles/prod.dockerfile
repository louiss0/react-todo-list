FROM node:16-alpine as prod

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

CMD [ "npm", "run", "prod" ]

FROM nginx:mainline

COPY --from=prod /app/public/ /usr/share/ngnix/html

EXPOSE 80

CMD [ "nginx", "-g", "dameon off;" ]