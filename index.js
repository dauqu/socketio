const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

//Serve static files from the React app
app.use(express.static('client/'));


// Set up a connection event for Socket.io
io.on('connection', (socket) => {
  console.log('A user connected.');

  // Join a room
  socket.on('join', (room) => {
    socket.join(room);
  });

  // Leave a room
  socket.on('leave', (room) => {
    socket.leave(room);
  });

  // Set up a custom event for receiving messages
  socket.on('chat-message', (room, msg) => {
    // Broadcast the message to all clients in the room
    io.to(room).emit('chat-message', msg);
  });

  //Audio call 
  socket.on('audio-call', (room, msg) => {
    // Broadcast the message to all clients in the room
    io.to(room).emit('audio-call', msg);
  });

  //Video call
  socket.on('video-call', (room, msg) => {
    // Broadcast the message to all clients in the room
    io.to(room).emit('video-call', msg);
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
