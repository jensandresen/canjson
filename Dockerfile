FROM node:alpine

WORKDIR /data
RUN npm install -g canjson@1.1.0

ENTRYPOINT [ "canjson" ]