FROM node:23

WORKDIR /app

COPY package.json .

RUN npm install --only=production

COPY . .

EXPOSE 8080

CMD [ "npm", "run", "start" ]
