FROM node:6.7.0
MAINTAINER F12 Production

RUN mkdir -p /app

COPY package.json /app/package.json
COPY src /app/src
COPY static /app/static
COPY middleware /app/middleware
COPY .babelrc /app/.babelrc
COPY .env.development /app/.env.development
COPY .env.production /app/.env.production
COPY server.development.js /app/server.development.js
COPY server.production.js /app/server.production.js
COPY webpack.config.development.js /app/webpack.config.development.js
COPY webpack.config.production.js /app/webpack.config.production.js

WORKDIR /app

ARG BUILD_NUMBER
ENV BUILD_NUMBER ${BUILD_NUMBER}

RUN npm install -g better-npm-run
RUN npm set registry http://npm.f12.global

RUN cd /app && npm install --unsafe-perm || \
  ((if [ -f npm-debug.log ]; then \
      cat npm-debug.log; \
    fi) && false)

EXPOSE 3001

CMD npm run server
