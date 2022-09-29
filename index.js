let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}
// app.listen(port, ()=>{
//     console.log(port);
// });

const io = require('socket.io')(port);

const users = {};

//this io.on will listen to various connections taking place. eg: aman, komal, yash etc. joined. Hence, any connection taking place will be listened by io.on
//In other words, io.on means for all the connections happening
io.on('connection' , socket =>{
    //socket.on will help us to perform any connections for a particular connection, eg: aman has joined the chat, so actions taken only for aman will be defined here.
    //in other words, socket.on means for events taking place by each connection.
    socket.on('new-user-joined',(nameOfNewJoiner)=>{
        users[socket.id] = nameOfNewJoiner;
        socket.broadcast.emit('user-joined',nameOfNewJoiner);
    })
    socket.on('send',message=>{
        socket.broadcast.emit('receive',{message:message,nameOfSender:users[socket.id]})
    })
    socket.on('disconnect',message=>{
        socket.broadcast.emit('leftTheChat',users[socket.id]);
        delete users[socket.id];
    })
})
