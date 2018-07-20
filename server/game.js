let games = new Object();
let root;

function setup(mainApp)
{
	root = mainApp;
	root.server.registerSocketEvent('GAME_LIST', getGamesList);
	root.server.registerSocketEvent('CREATE_GAME', createGame);
	root.server.registerSocketEvent('JOIN_GAME', joinGame);
	root.server.registerSocketEvent('LEAVE_GAME', leaveGame);
}

function getGamesList(socket, data)
{
	socket.emit('GAME_LIST', games);
}

function createGame(socket, data)
{
	if(!games[data.name])
	{
		games[data.name] = new Game(data.name);
		root.clientService.sendToAll('GAME_LIST', games);
	}
}

function joinGame(socket, data)
{
	if(gameExists(data.name))
	{
		games[data.name].addPlayer(data.player);
		socket.emit('JOIN_GAME', null);
		getGamesList(socket, null);
	}
}

function leaveGame(socket, data)
{
	if(gameExists(data.name))
	{
		this.games[data.name].removePlayer(data.player);
	}
}

function gameExists(gameName)
{
	return games[gameName];
}

function Game(name)
{
	this.name = name;
	this.players = new Array();

	this.addPlayer = (player) => 
	{
		if(!this.hasPlayer(player) && this.players.length < 4)
		{
			this.players.push(player);
		}
	};
	
	this.removePlayer = (player) => 
	{
		let index = this.indexOfPlayer(player);
		if(index != -1)
			this.players.splice(index, 1);
	};

	this.hasPlayer = (player) => 
	{
		this.players.forEach(p => 
		{
			if(p.id == player.id) return true;	
		});
		return false;
	};

	this.indexOfPlayer = (player) =>
	{
		if(this.hasPlayer(player))
		{
			this.players.forEach((p, index) => 
			{
				if(p.id == player.id) return index;
			});
		}
		else
			return -1;
		
	};
}

module.exports = 
{
	setup: setup,
	games: games
};