var app = require('express')();var http = require('http').createServer(app);const PORT = 8080;
var cors = require('cors');
app.use(cors());
http.listen(PORT, () => {
    console.log(`listening on *:${PORT}`);
});


var io = require('socket.io')(http,
    {cors: {
        origin: '*'
        }}
    )
io.on('connection', socket => {  // Whenever someone connects to the socket
    console.log("New client connected at: "+socket.id)
    socket.on('send-message', (message) => {  // When sent a message do this...
        console.log(`I have received the following message: ${message}`)
        const room = "";
        if (room === ""){
            console.log(`Emitting Message: ${message}`)
            socket.broadcast.emit('receive-message', message)  // Send to all clients except client sending
        } else {
            console.log(`Emitting Message: ${message}`)
            socket.to(room).emit('receive-message', message)  // Send only to clients in the same room
        }
    })
    socket.on('join-room', (room) => {
        socket.join(room)  // Join room
    })
})