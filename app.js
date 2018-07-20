let root = 
{
	server: require('./server/server.js'),
	gameService: require('./server/game.js'),
	clientService: require('./server/clients.js')
};

setup();

function setup()
{
	root.server.setup(root);
	root.gameService.setup(root);
	root.clientService.setup(root);
	root.server.init();
}