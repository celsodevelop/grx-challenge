FROM node:16.14

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
ENV HOME=/home/node/

ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
ENV PATH=/home/node/.npm-global/bin:${PATH}

RUN npm i --unsafe-perm -g npm@8.5.0

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

RUN chown -R node:node $(npm config get prefix)/lib/node_modules
RUN chown -R node:node /usr/local/bin


WORKDIR /home/node/app

COPY package*.json ./

RUN apt-get update && apt-get install -y netcat
USER node

RUN npm install

COPY --chown=node:node . .

EXPOSE 8080
