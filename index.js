const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const Chat = require('./app/Chat')

app.set('view engine', 'pug');
app.set('views', 'views');
//init express
app.use(express.static('public'))
app.get('/', function (req, res) {//route de base 
    res.render('index', { title: 'Hey', message: 'Chat room' });
})

const chat = new Chat(io)

io.on('connection', (socket) => {
    console.log(socket);
    chat.onConnection(socket)
});
io.on('disconnection', (socket) => {
    console.log('disconnection');
});
http.listen(9000, function () {
    console.log('Example app listening on port 9000!')
})