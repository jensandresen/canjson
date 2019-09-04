FROM node:alpine

WORKDIR /data
RUN npm install -g canjson@1.0.0

ENTRYPOINT [ "canjson" ]