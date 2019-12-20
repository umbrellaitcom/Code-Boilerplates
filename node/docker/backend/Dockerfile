FROM node:lts-alpine

RUN mkdir -p /var/www/
WORKDIR /var/www/

RUN chown -R node:node /var/www
USER node
RUN npm install

EXPOSE 3000
