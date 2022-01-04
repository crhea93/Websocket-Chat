import {io} from "socket.io-client";

const joinRoomButton = document.getElementById('room-button');
const messageInput = document.getElementById('message-input');
const roomInput = document.getElementById('room-input');
const form = document.getElementById('form');

const socket = io('http://localhost:3000');  // connect to server

socket.on("connect", () => {
    displayMessage(`You connected with id: ${socket.id}`)
})

// recieve message from server
socket.on("receive-message", message => {
    displayMessage(message)
})


// Create event listener to trigger on form submission
form.addEventListener("submit", e => {
    e.preventDefault();  // prevent submission
    const message = messageInput.value;  // get message input
    const room = roomInput.value;  // Get room name
    socket.emit('send-message', message, room)
    // print out message
    if (message === "") {
        console.log('No message entered.')
    }else{
        messageInput.value = '';   // Clear message value
        return displayMessage(message)
    }
})

joinRoomButton.addEventListener('click', () => {
    const room = roomInput.value;  // get room name
    // Tell server we are joining room
    socket.emit('join-room', room)
})

function displayMessage(message) {
    const div = document.createElement("div")  // create div
    div.textContent = message;  // add message to div
    document.getElementById('message-container').append(div)  // Add new div to message container
}