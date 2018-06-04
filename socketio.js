var socketio = {};
var socket_io = require('socket.io');

//获取io
socketio.getSocketio = function(server){
    var io = socket_io.listen(server);

    // save all the client {"sid": socket.id, "clientName": client}
    var clients = []

    io.on("connection", function(socket){
        socket.on("add_client", function(client){
            console.log(client + " join the chat");

            var clientObj = {};
            clientObj["sid"] = socket.id;
            clientObj["clientName"] = client;

            clients.push(clientObj);
            io.emit("user_status", clients)
        });

        socket.on("new_message", function(msg){
            console.log("Server got message: "+msg);
            console.log("Send message using: "+socket.conn.transport.name);
            io.emit("new_message", msg);
        });

        socket.on("disconnect", function(){
            for(var i = 0; i<clients.length; i++){
                if(clients[i]["sid"] == socket.id){
                    console.log(clients[i]["clientName"]+" leave the chat");
                    clients.splice(i, 1);
                    break;
                }
            }
            io.emit("user_status", clients);
        });
    });
};

module.exports = socketio;
