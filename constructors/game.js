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

	getSchema() {
		return `Game(gameId, abbrev, name, releaseYear, weblink)`;
	}

	getValues() {
		return `('${this.gameId}', '${this.abbrev}', '${this.name}', '${this.releaseYear}', '${this.weblink}')`;
	}

	toSQL() {
		return this.getSchema() + ' VALUES' + this.getValues() + ';';
	}
}