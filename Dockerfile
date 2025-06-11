FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --prod

FROM nginx:alpine
RUN apk add --no-cache openssl curl

COPY --from=build /app/dist/coreui-free-angular-admin-template/browser /usr/share/nginx/html

COPY /nginx/default.conf /etc/nginx/conf.d/default.conf
RUN mkdir -p /etc/nginx/ssl
COPY certs/wildcard.crt /etc/nginx/ssl/
COPY certs/wildcard.key /etc/nginx/ssl/

RUN chmod -R 755 /usr/share/nginx/html && \
    chmod 644 /etc/nginx/ssl/wildcard.crt && \
    chmod 600 /etc/nginx/ssl/wildcard.key

EXPOSE 80 443
CMD ["nginx", "-g", "daemon off;"]
