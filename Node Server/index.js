// NodeServer Which Will Handle SocketIO Connections.
const io = require('socket.io')(8000)

const users = {};

io.on('connection', socket => {
    // Notifys Current users about joining of new users
    socket.on('new-user-joined', name => {
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name);
    });

    // When Someone sends a message, broadcast it to others
    socket.on('send', message => {
        socket.broadcast.emit('receive', {message: message, name: users[socket.id]})
    });

    //When someone leaves the chat, others are notified
    socket.on('disconnect', message => {
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
    });
})  