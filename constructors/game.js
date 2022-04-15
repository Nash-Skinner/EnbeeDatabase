/**
 * Game
 * 
 * Primary Key: gameId
 */
class Game {
    constructor(gameId, abbrev, name, platforms, releaseYear, weblink) {
        this.gameId = gameId;
		this.abbrev = abbrev;
		this.name = name;
		this.platforms = platforms;
		this.releaseYear = releaseYear;
		this.weblink = weblink;
    }
}

module.exports = Game;