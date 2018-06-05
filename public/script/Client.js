class Client {
    constructor() {

        this.socket = io('/');
        this.pseudo = null;
        this.id=null;
        this.socket.on('response', this.receiveMessage);
//        this.socket.emit('new_User',this.pseudo);
    }

    sendMessage(messageText) {
        if (messageText.length > 0) {
            this.socket.emit('message', {
                pseudo : this.pseudo,
                msg : messageText
            });
        }
    }

    receiveMessage(message) {
        let template = `<div class="content-message"><span class="user">
                        ${message.pseudo}
                    </span>
                    <span class="user-message">
                        ${message.msg}
                    </span></div>`;

        $('.messages').append( template );
    }
    updateListUser(users){
        //console.log(users)
    let template;
            for (var i = 0; i < users.length; i++) {
                template+='<li>'+users[i]+'</li>';
        }    
        $('.liste-users').append(template);        
    }
}
