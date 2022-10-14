FROM node:16-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install\
	&& npm install -g typescript

COPY . /app
RUN tsc

ENTRYPOINT ["node", "/app"]