# Backend-chat-app

This app is a backend app to create a websocket server to allow send messages from frontends connected to server and receive an answer automatically.

## Setup

### $ npm run install

To install dependencies

### Create .env file

- Create a .env file
- add a `PORT` environment variable to set server port
- add a `FRONTEND_URL` environment variable to allow frontend url in cors

## Available answers

### olá

- frontend: olá
- server: Olá, como vai você?

### tudo bem e com você?

- frontend: tudo bem e com você?
- server: Estou bem

### hello

- frontend: hello
- server: Hello, how are you?

### i'm fine and you?

- frontend: i'm fine and you?
- server: I'm fine too!

### default

- frontend: default
- server: I can't understand, can you type your message again, please?

## Available commands

### $ npm run start

Start application without reloading on changes.

### $ npm run dev

Start application watching every change on app to reload application with new changes applied.

### $ npm run test

Run unit tests created for this application.

## Available listeners

### send_message

This listener is user to receive messages from user and answer a automatic message to same user connected on chat.

## Available emiters

### receive_message

This emiter delivery messages to user.
