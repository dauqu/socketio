const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

// Set up a route for the home page
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Set up a connection event for Socket.io
io.on('connection', (socket) => {
  console.log('A user connected.');

  // Join a room
  socket.on('join', (room) => {
    socket.join(room);
    console.log(`User joined room: ${room}`);
  });

  // Leave a room
  socket.on('leave', (room) => {
    socket.leave(room);
    console.log(`User left room: ${room}`);
  });

  // Set up a custom event for receiving messages
  socket.on('chat message', (room, msg) => {
    console.log(`Message in room ${room}: ${msg}`);

    // Broadcast the message to all clients in the room
    io.to(room).emit('chat message', msg);
  });

  // Set up a disconnect event
  socket.on('disconnect', () => {
    console.log('A user disconnected.');
  });
});

// Start the server
http.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
