/**
 * Game
 * 
 * Primary Key: gameId
 */
export default class Game {
    constructor(gameId, abbrev, name, releaseYear, weblink) {
        this.gameId = gameId;
		this.abbrev = abbrev;
		this.name = name;
		this.releaseYear = releaseYear;
		this.weblink = weblink;
    }

	toSQL() {
		return `INSERT INTO Game(gameId, abbrev, name, releaseYear, weblink) VALUES('${this.gameId}', '${this.abbrev}', '${this.name}', '${this.releaseYear}', '${this.weblink}');`;
	}
}