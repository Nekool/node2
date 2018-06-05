
const client = new Client();

$(document).ready(function () {
    // Lorsqu'on a choisi un pseudo
    $('.connect').one('submit', (event) => {
        event.preventDefault();
        client.pseudo = strip( $('.pseudo').val() );
        client.socket.emit('new_User',client.pseudo);
        $('.popUp').remove();
    });
   client.socket.on('list_User',(users)=>{
       console.log(users)
       client.updateListUser(users)
   })
    // Lorsqu'on envoie un message
    $('.form').on('submit', (event) => {
        event.preventDefault();

        let messageText = strip( $('.msg').val() );
        client.sendMessage(messageText);

        $('.msg').val('');
        client.receiveMessage({ 
            pseudo : client.pseudo,
            msg : messageText
        });
    });
});

// -------------------------------------------------
//     FONCTION UTILITAIRES
// -------------------------------------------------

function strip(html) {
    var tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
}