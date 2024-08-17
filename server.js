const express = require('express');
const WebSocket = require('ws');
const app = express();
const port = process.env.PORT || 3000;

// Статические файлы
app.use(express.static('public'));

// WebSocket сервер
const wss = new WebSocket.Server({ noServer: true });

wss.on('connection', (ws) => {
    ws.on('message', (message) => {
        // Отправляем всем подключенным клиентам обновление текста
        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });
});

const server = app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});

server.on('upgrade', (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, (ws) => {
        wss.emit('connection', ws, request);
    });
});
