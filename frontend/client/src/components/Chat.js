import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Button,
    Form,
    FormGroup,
    Input,
    Label
} from "reactstrap";
import socketClient from "socket.io-client";
const SERVER = "http://127.0.0.1:8080";


//function sendMessage(){
    //axios.get("/api/chats").then(res => this.setState({chatList: res.data})).catch(e => console.log(e))
//}
let socket = socketClient(SERVER);  // Need to define this outside of the Chat so that it doesn't get recreated everytime we rerender our chat!
function Chat(){
    const [messages, setMessages] = useState([]);
    //const [socket, setSocket] = useState(socket_init)

    useEffect(() => {
        socket.on('connect', () => {
            console.log(`I'm connected with the back-end`);
        });
        socket.on('receive-message', (message) => {
            console.log(message);
            let newMessages = [...messages]; // copying the old datas array
            newMessages.push(message);  // Add new message        // print out message
            setMessages(newMessages)  // Set message state with new message
            });
      }, []);





    const sendMessage = (e) => {  // Define what to do when we send a message
        e.preventDefault();  // prevent submission
        const messageInput = document.getElementById('message-input');
        const roomInput = document.getElementById('room-input');
        const message = messageInput.value;  // get message input
        //console.log(message)
        //const room = roomInput.value | 1;  // Get room name
        console.log(`Sending Message: ${message}`)
        socket.emit('send-message', message)  // Send message to server
        if (message === "") {
            console.log('No message entered.')
        }else{
            messageInput.value = '';   // Clear message value
            let newMessages = [...messages]; // copying the old datas array
            newMessages.push(message);  // Add new message        // print out message
            setMessages(newMessages)  // Set message state with new message
        }
    }

    return(
            <div className='col-lg-6 w-50 h-50 align-items-center mx-auto'>
            <div id="message-container" className='col-lg-12 border border-info rounded w-100 h-50'>
              {messages.map(message => (
                  <div key={message.id}>
                    <p>{message}</p>
                  </div>
              ))}
            </div>
            <Form>
                  <FormGroup>
                      <Label for='message-input'>Message</Label>
                      <Input
                        type='text' name='message' id="message-input"
                        placeholder="Enter Message"
                      />
                  </FormGroup>
                <Button color='success' onClick={sendMessage}>
                    Send
              </Button>
                  <FormGroup>
                      <Label for='room-input'>Room</Label>
                      <Input
                        type='text' id="room" name='room-input'
                         placeholder="room"
                      />
                  </FormGroup>
                <Button color='success'>
                    Join
              </Button>
            </Form>
            </div>
        )
}
export default Chat
