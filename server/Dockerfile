FROM node:erbium-alpine

WORKDIR /usr/src/app

EXPOSE 300

COPY ./package*.json ./

RUN npm install

COPY . .

CMD ["npm", "start"]