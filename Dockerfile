FROM nginx:mainline-alpine-slim

COPY ./index.html /usr/share/nginx/html/index.html
COPY ./css/style.css /usr/share/nginx/html/css/style.css
COPY ./js/script.js /usr/share/nginx/html/js/script.js