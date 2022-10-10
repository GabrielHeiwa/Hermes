FROM node:18
COPY *.json .
RUN npm ci --onyl=prod
COPY . .
RUN npm run build
EXPOSE ${PORT}
CMD [ "npm", "run", "start:prod" ]