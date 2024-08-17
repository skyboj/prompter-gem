const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('message', (message) => {
    io.emit('message', message); // Отправляем сообщение всем подключенным клиентам
  });
});

server.listen(3000, () => {
  console.log('Server listening on port 3000');
});
