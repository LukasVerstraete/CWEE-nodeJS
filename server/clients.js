let clients = new Object();
let sockets = new Object();
let root;

function setup(mainApp)
{
    root = mainApp;
    root.server.registerSocketEvent('CONNECT', connect);
    root.server.registerSocketEvent('disconnect', disconnect);
}

function connect(socket, data)
{
    createClient(socket, data)
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

function createClient(socket, data)
{
    if(clients[socket.id] == null)
    {
        let id = uuidv4();
        let username = data.username;
        let client = new Client(id, username);
        clients[socket.id] = client;
        sockets[socket.id] = socket;
    }
}

function sendToAll(eventName, data)
{
    for(socket in sockets)
    {
        sockets[socket].emit(eventName, data); 
    }
}

function uuidv4() 
{
    var S4 = function () 
    {
		return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
	};
	return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}

function Client(id, username)
{
    this.id = id;
    this.username = username;
}

module.exports = 
{
    setup: setup,
    clients: clients,
    sendToAll: sendToAll
};