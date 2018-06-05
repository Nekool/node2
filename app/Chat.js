class Chat {
    constructor(io) {
        this.io = io;
        this.socket = null;
        this.users = [];
    }
    
    onConnection(socket) {
        console.log('a user connected')
        this.socket = socket;
        this.socket.on('message', (message) => this.receiveMessageFromClient(message));
        this.socket.on('new_User', (pseudo)=>{
            this.users.push(pseudo);
            console.log(this.users);
            this.socket.emit('list_User',this.users);
        })
    }

    receiveMessageFromClient(message) {
        console.log('message: ' + message.msg);
        this.socket.broadcast.emit('response', message);
    }
}

module.exports = Chat;
