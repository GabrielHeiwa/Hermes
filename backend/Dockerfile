FROM node:12.17.0-alpine

WORKDIR /usr/src/app

COPY package*.json ./
COPY tsconfig*.json ./
COPY . .

RUN npm install pm2 typescript -g
RUN npm install
RUN ls -la
RUN npm run build

CMD ["pm2-runtime", "./build"]

EXPOSE 3000
