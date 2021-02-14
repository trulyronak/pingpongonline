class Room {
	constructor(name) {
		this.name = name;
		this.filled = false;
		this.players = {};
	}

	join(player) {
		this.players[player.name] = player;
		this.filled = (Object.keys(this.players).length === 2);
	}

	removePlayer(player) {
		if (this.players[player]) {
			delete this.players[player];
			this.filled = false;
		}
	}
}

class Player {
	constructor(name) {
		this.name = name;
		this.x = this.y = this.z = 0;
	}
}

module.exports = {
	Room,
	Player
};