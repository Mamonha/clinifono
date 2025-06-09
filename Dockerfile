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

# Criando os diretorios para logs e certificados
RUN mkdir -p /etc/nginx/ssl /var/log/nginx

# Copiando os certificados para maquina
COPY ./certs/wildcard.key /etc/nginx/ssl
COPY ./certs/wirldcard.crt /etc/nginx/ssl


EXPOSE 80 443
CMD ["nginx", "-g", "daemon off;"]
