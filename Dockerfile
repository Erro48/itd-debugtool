FROM node:latest
WORKDIR /build
EXPOSE 3000
COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm ci
COPY public/ public
COPY src/ src
ENV REACT_APP_CORS_PROXY_SERVER=http://localhost:8080/
CMD npm run docker
