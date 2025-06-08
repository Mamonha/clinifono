FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --prod
COPY --chown=root:root filebeat.yml /usr/share/filebeat/filebeat.yml
RUN chmod 600 /usr/share/filebeat/filebeat.yml

FROM nginx:alpine
RUN apk add --no-cache openssl curl

COPY --from=build /app/dist/coreui-free-angular-admin-template/browser /usr/share/nginx/html

COPY nginx.conf /etc/nginx/nginx.conf

RUN mkdir -p /etc/nginx/ssl /var/log/nginx

# Aqui estou gerando mas podemos apenas copiar o que ja temos
RUN openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
    -keyout /etc/nginx/ssl/key.pem \
    -out /etc/nginx/ssl/cert.pem \
    -subj "/C=BR/ST=PR/L=Foz/O=App/CN=localhost"

EXPOSE 80 443
CMD ["nginx", "-g", "daemon off;"]