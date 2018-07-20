let app = require('express')();
let httpServer = require('http').createServer(app);
let io = require('socket.io').listen(httpServer);

let port = 3000;

let socketEvents = [];

let root;

function setup(mainApp)
{
    root = mainApp;
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

module.exports = 
{
    io: io,
    setup: setup,
    registerSocketEvent: registerSocketEvent,
    init: init
};