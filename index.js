const express = require('express');
const app = express();

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', './views');

const server = require('http').Server(app);
const io = require('socket.io')(server);

io.on('connection', (socket) => {
    console.log('Co nguoi ket noi id: ' + socket.id);

    socket.on('disconnect', () => {
        console.log(socket.id + ' da ngat ket noi.')
    })

    socket.on('client data', (data) => {
        console.log(data)
        // io.sockets.emit('server data', data);
        // socket.emit('server data', data + " YOU")
        socket.broadcast.emit('server data', data + " YOU");
    })
})

server.listen(3000, () => console.log("Listening port 3000."));

// router
app.get('/', (req, res) => res.render('index'));