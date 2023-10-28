FROM node:latest
WORKDIR /build
EXPOSE 3000
COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm ci
COPY public/ public
COPY src/ src
COPY .env .env
CMD npm run start
