const io = require("socket.io")(3000, {
    cors: {
        origin: ['http://localhost:8080'],
    }
})  // define server at 3000

io.on('connection', socket => {  // Whenever someone connects to the socket
    console.log(socket.id)
    socket.on('send-message', (message, room) => {  // When sent a message do this...
        console.log(message)
        if (room === ""){
            socket.broadcast.emit('receive-message', message)  // Send to all clients except client sending
        } else {
            socket.to(room).emit('receive-message', message)  // Send only to clients in the same room
        }
    })
    socket.on('join-room', (room) => {
        socket.join(room)  // Join room
    })
})