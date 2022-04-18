/**
 * Game
 * 
 * Primary Key: gameId
 */
export default class Game {
    constructor(gameId, abbrev, name, platforms, releaseYear, weblink) {
        this.gameId = gameId;
		this.abbrev = abbrev;
		this.name = name;
		this.platforms = platforms;
		this.releaseYear = releaseYear;
		this.weblink = weblink;
    }

	toSQL() {
		return `INSERT INTO Game(gameId, abbrev, name, platforms, releaseYear, weblink) VALUES('${this.gameId}', '${this.abbrev}', '${this.name}', '${this.platforms}', '${this.releaseYear}', '${this.weblink}');`;
	}
}