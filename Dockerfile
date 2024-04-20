ARG NODE_VERSION=20.11.1

FROM node:${NODE_VERSION}-alpine as base

WORKDIR /app/

EXPOSE 3000

COPY . /app/

RUN npm install

CMD ["npm", "start"]