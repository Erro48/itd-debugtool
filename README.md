<!-- ![iTD Debug Tool icon](./public/favicon.ico) -->

# 🌐 Interactive TD DebugTool

![](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![](https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white)

Debug tool which simplifies the interactions with Things in the Web of Things world

## Prerequisiti

Per poter eseguire l'applicazione occore che siano installati:

- **npm**: versione ...
-

## Installazione

```sh
npm install
```

## Usage

Una volta installato eseguire il comando

```sh
npm run start
```

Per specificare l'indirizzo del cors server, creare un file `.env` con le seguenti due variabili

```js
REACT_APP_CORS_PROXY_HOST=<proxy-server>
REACT_APP_CORS_PROXY_PORT=<proxy-port>
```

oppure eseguire direttamente il comando:

```sh
set REACT_APP_CORS_PROXY_HOST=<proxy-server>&& set REACT_APP_CORS_PROXY_PORT=<proxy-port>&& npm run start
```
