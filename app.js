var app = require('express')();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var Game = require('./server/game.js');

var port = 3000;

var clients = new Object();

server.listen(port, function() 
{
	console.log("Started listening on port: *:" + port);
});

io.set('transports', 'websocket');


//defining sockets/////////////////////
io.sockets.on('connection', function(socket) 
{	
	socket.on('CONNECT', function(data) 
	{
		connect(socket, data);
	});
	
	socket.on('disconnect', function() 
	{
		console.log('A user disconnected...');
		delete clients[socket.id];
	});
	
	socket.on('DISCONNECT', function(data) 
	{
		disconnect(socket, data);
	});
	
	socket.on('CREATE_GAME', function(data) 
	{
		createGame(socket, data);
	});
});
///////////////////////////////////////

//user authentication//////////////////
function connect(socket, data)
{
	if(!data.clientId)
		data.clientId = generateId();
	
	clients[socket.id] = data;
	console.log(data.username + ' has connected to the server...');
	socket.emit('READY_CONNECT', clients[socket.id]);
}

function generateId(){
	var S4 = function () {
		return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
	};
	return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}

function disconnect(socket, data)
{
	//TODO: close all user games etc.
	delete clients[socket.id];
	socket.emit('READY_DISCONNECT', null);
}
//////////////////////////////////////

//games///////////////////////////////

function createGame(socket, data)
{
	Game.createGame(clients[socket.id], data);
	socket.emit('READY_CREATE_GAME', Game.games[clients[socket.id].clientId]);
}

/////////////////////////////////////
