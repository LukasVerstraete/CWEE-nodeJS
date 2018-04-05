let root = 
{
	server: require('./server/server.js'),
	gameService: require('./server/game.js')
};

setup();

function setup()
{
	root.server.setup(root);
	root.gameService.setup(root);
	root.server.init();
}