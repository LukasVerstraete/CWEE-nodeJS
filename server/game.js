var games = new Object();

function createGame(owner, name)
{
	if(owner)
	{
		var game = {};
		game.owner = owner;
		game.name = name;
		games[owner.clientId] = game;
	}
}

module.exports = 
{
	games: games,
	createGame: createGame
};