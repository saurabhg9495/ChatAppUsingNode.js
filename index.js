const express=require('express');
const app=express();
const http = require('http');
const server = http.createServer(app);
const socketio = require("socket.io");
const io = socketio(server);

const connect=require('./config/db-config');

//use to stablish a connection 
io.on('connection', (socket) => {
    console.log('a user connected',socket.id);

    socket.on('msg_send',(data)=>{
        console.log(data);
        io.emit('msg_received',data); //used for sending the msg to all the websocket connection existing over the server
        //socket.emit is for the same client
        //socket.broadcast.emit is used to send msg to all the other clients except the one sending
    })
});

app.use('/',express.static(__dirname+'/public'));

//server.use is used instead of app.use 
server.listen(3000,async ()=>{
    console.log('Server Started at 3000');
    await connect();
    console.log("mongoDB connected");
});
