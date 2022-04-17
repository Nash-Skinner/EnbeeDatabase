/**
 * SteamGame
 * 
 * Primary Key: {app_id}
 */
class SteamGame {
	constructor(appId, abbrev, developer, releaseDate, publisher, rating) {
		this.appId = appId;
		this.abbrev = abbrev;
		this.developer = developer;
		this.releaseDate = releaseDate;
		this.publisher = publisher;
		this.rating = rating;
	}
}

export { SteamGame };