ARG NODE_VERSION=18.18.0-alpine
ARG NGINX_VERSION=1.15

# Stage build
FROM node:${NODE_VERSION} AS doc_builder

RUN npm i -g pnpm

WORKDIR /ineumann-tutorials

COPY .docker/docusaurus/package.json .

RUN pnpm install

RUN rm -rf docs/* && rm -rf blog

COPY .docker/docusaurus/docusaurus.config.js .
COPY .docker/docusaurus/sidebars.js .
COPY img/ineumann-logo.png static/img/ineumann-logo.png
COPY img/favicon.ico static/img/favicon.ico
COPY .docker/docusaurus/custom.css src/css/custom.css
COPY .docker/docusaurus/index.js src/pages/index.js

COPY . docs/

RUN rm -rf docs/ci && \
    mv docs/blog ./blog && \
    pnpm run build

# Stage run
FROM nginx:${NGINX_VERSION} AS doc

COPY .docker/nginx/default.conf /etc/nginx/conf.d/default.conf

COPY .docker/nginx/docker-entrypoint.sh /docker-entrypoint.sh

COPY --from=doc_builder /ineumann-tutorials/build/ /usr/share/nginx/html

RUN chmod +x /docker-entrypoint.sh && \
    chmod -R 755 /usr/share/nginx/html && \
    chown -R nginx:nginx /usr/share/nginx/html

ENTRYPOINT ["/docker-entrypoint.sh"]

CMD [ "nginx", "-g","daemon off;" ]
