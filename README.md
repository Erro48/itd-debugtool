# 🌐 Interactive TD DebugTool

![](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![](https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white)

_Interactive Thing Description Debug Tool_ is a tool created to make it easier to debug and test Thing Descriptions in a web of things environment. It is able to display a Thing Description automatically, generating an easy-to-use user interface that allows the user to interact with one or more Thing Descriptions.

## Installation

```sh
npm install
```

## Usage

To execute the application, run the command

```sh
npm run start
```

To avoid problems with messages being blocked by CORS policies, you can use a proxy server as an intermediary for communications.
To specify proxy server address, put the following line in a `.env` file.

```js
REACT_APP_CORS_PROXY_SERVER=<proxy-server>:<proxy-port>/
```

Eventually is possible to directly execute the following command.

```sh
REACT_APP_CORS_PROXY_SERVER=<proxy-server>:<proxy-port>/ npm run start
```

### Execution with Docker

To run the application using Docker, run the following command to build the image.

```sh
docker build -t itd-debugtool:latest .
```

Then is possible to run the container with the following command.

```sh
docker run --name itd-debugtool -p <localhost-port>:3000 itd-debugtool:latest
```

To specify the address of the proxy server, set the environment variable when you run the container.

```sh
docker run --name itd-debugtool -p <localhost-port>:3000 --env REACT_APP_CORS_PROXY_SERVER=<proxy-server>:<proxy-port> itd-debugtool:latest
```
