var socket = require('socket.io-client')('http://127.0.0.1:3000');

socket.on('connect', function(){
    socket.emit("add_client", 12);
    socket.emit("new_message", "{'sender':'12', 'msg':'teste'}");
    socket.close();
});

socket.on('new_message', function(data){
    //socket.emit("new_message", "{'sender':'12', 'msg':'teste'}");
});

socket.on('disconnect', function(){});

