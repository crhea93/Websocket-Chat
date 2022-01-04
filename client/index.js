// Code for server

const http = require("http");  // Create consistent webserver
const WebSocketServer = require("websocket").server  // Create websocket server!
let connection = null;  // initialize conncetion

// Now make the server and spin it up!
const httpserver = http.createServer((req, res) => {
    console.log("We have received a request");
})

// Create websocket
const websocket = new WebSocketServer({
    'httpServer': httpserver,  // Handshake --> pass http server to websocket server
})

websocket.on("request", (request) => {  // When someone requests the websocket
    connection = request.accept(null, request.origin); // Accept request as server and create connection!
    connection.on("onopen", e => console.log('Opened'))
    connection.on("onclose", e => console.log('Closed'))
    connection.on("onmessage", message => {  // If a message is received by the server
        console.log(`Received: ${message}`);
    })
})
// spin up server on port 8080
httpserver.listen(8080, () => {
    console.log('My server is listening on port 8080.');  // Let people know we are listening on port 8080
})