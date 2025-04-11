FROM node:23 as development

ARG VITE_API_URL

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

RUN npm run build

FROM nginx as production

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=development /app/dist /usr/share/nginx/html

EXPOSE 80

ENTRYPOINT [ "nginx", "-g", "daemon off;" ]
