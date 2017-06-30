var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var port = 3000;

app.get('/', function(req, res) 
{
	res.send('<h1>Error 404</h1> <p>Page not found</p>')
});

io.on('connection', function(socket) 
{
	console.log('A user connected...');
	
	socket.on('disconnect', function() 
	{
		console.log('A user disconnected...');
	});
});

http.listen(port, function() 
{
	console.log("Started listening on port: *" + port);
});