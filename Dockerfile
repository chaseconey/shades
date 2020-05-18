# Build Container
FROM node:10 AS build

WORKDIR /app
COPY . /app/

RUN npm install --production

# Run Container
FROM node:10.15.3-alpine as run

# We use Tini to init node before running `'node server.js'
RUN apk add --no-cache tini

USER node

ENV PORT 3000
ENV CONTAINER_PATH "/var/www"
ENV NODE_ENV=production

WORKDIR $CONTAINER_PATH
COPY --from=build /app /var/www

EXPOSE $PORT

ENTRYPOINT ["/sbin/tini", "--"]
CMD ["npm", "start"]
