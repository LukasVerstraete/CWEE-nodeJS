let games = new Object();
let root;

function setup(mainApp)
{
	root = mainApp;
	root.server.registerSocketEvent('GAME_LIST', getGamesList);
	root.server.registerSocketEvent('CREATE_GAME', createGame);
}

function getGamesList(socket, data)
{
	socket.emit('GAME_LIST', games);
}

function createGame(socket, data)
{
	if(!games[data.name])
	{
		games[data.name] = 
		{
			name: data.name,
			players: []
		};
	}
}

module.exports = 
{
	setup: setup,
	games: games,
	createGame: createGame
};