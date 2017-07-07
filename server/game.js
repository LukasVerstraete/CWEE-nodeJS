var games = new Object();

function createGame(owner)
{
	if(!owner)
	{
		var game = {};
		game.owner = owner;
	}
}



module.exports = 
{
	games: games,
	createGame: createGame
};