/**
 * SteamGame
 * 
 * Primary Key: {app_id}
 */
export default class SteamGame {
	constructor(appId, abbrev, developer, releaseDate, publisher, rating) {
		this.appId = appId;
		this.abbrev = abbrev;
		this.developer = developer;
		this.releaseDate = releaseDate;
		this.publisher = publisher;
		this.rating = rating;
	}

	getSchema() {
		return `SteamGame(appId, abbrev, developer, releaseDate, publisher, rating)`;
	}

	getValues() {
		return `('${this.appId}', '${this.abbrev}', '${this.developer}', '${this.releaseDate}', '${this.publisher}', '${this.rating}')`;
	}

	toSQL() {
		return this.getSchema() + ' VALUES' + this.getValues() + ';';
	}
}