FROM nginx:mainline-alpine

COPY --chown=nginx:www-data ./build /usr/share/nginx/html
COPY --chown=root:root default.conf /etc/nginx/conf.d/default.conf
