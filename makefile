IMAGE_NAME=canjson

init: restore

restore:
	cd src && npm install

test:
	@ cd src && npm run test:watch

run:
	@ cd src && npm run test:run

container:
	@ docker build -t $(IMAGE_NAME) .