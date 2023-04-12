const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const fs = require('fs');

// Serve static files from a public directory
app.use(express.static(__dirname + '/public'));

// Listen for Socket.IO connections
io.on('connection', (socket) => {
  console.log('A user connected');

  // Listen for video stream data
  socket.on('stream', (data) => {
    // Write the video stream data to a file
    fs.appendFileSync('output.webm', data);
    // Emit the stream data to all connected sockets, including the sender
    socket.broadcast.emit('stream', data);
  });

  // Listen for disconnections
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// Start the server
const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
