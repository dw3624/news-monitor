FROM node:16-slim

WORKDIR /usr/src/app

COPY package.json package-lock.json ./

RUN npm ci
COPY . .
RUN npm run build
CMD npm run dev -- --host
