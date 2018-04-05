let app = require('express')();
let httpServer = require('http').createServer(app);
let io = require('socket.io').listen(httpServer);

let port = 3000;

let socketEvents = [];
let clients = new Object();

let root;

function setup(mainApp)
{
    root = mainApp;
    registerSocketEvent('CONNECT', connect);
    registerSocketEvent('disconnect', disconnect);
}

function registerSocketEvent(name, callback)
{
    socketEvents.push(
    {
        name: name,
        callback: callback
    });
}

function init()
{
    httpServer.listen(port, function() 
    {
        console.log("Started Listening on port: *:" + port);
    });
    io.set('transports', 'websocket');
    io.sockets.on('connection', function(socket) 
    {
        socketEvents.forEach(event => 
        {
            socket.on(event.name, function(data) 
            {
                event.callback(socket, data);
            });
        });
    });
}

function connect(socket, data)
{
    data.id = uuidv4();
    clients[socket.id] = data;
    console.log(data.username + ' has connected to the server');
    socket.emit('READY_CONNECT', clients[socket.id]);
}

function disconnect(socket, data)
{
    if(clients[socket.id])
    {
        console.log(clients[socket.id].username + " has disconnected from the server.");
        delete clients[socket.id];
    }
}

function uuidv4() 
{
    var S4 = function () {
		return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
	};
	return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}

module.exports = 
{
    io: io,
    clients: clients,
    setup: setup,
    registerSocketEvent: registerSocketEvent,
    init: init
};