# Dockerfile  

FROM node:12.10.0-alpine 

RUN mkdir -p /app
WORKDIR /app  
COPY package.json /app

RUN npm install
RUN npm build

COPY . /app  

EXPOSE 3000
CMD npm start