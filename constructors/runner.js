/**
 * Runner
 * 
 * Primary Key: {userId}
 */
export default class Runner {
    constructor(userId, username, region, pronouns, joinDate) {
		this.userId = userId;
        this.username = username;
        this.region = region;
        this.pronouns = pronouns;
        this.joinDate = joinDate;
    }

	toSQL() {
		return `INSERT INTO Runner(userId, username, region, pronouns, joinDate) VALUES('${this.userId}', '${this.username}', '${this.region}', '${this.pronouns}', '${this.joinDate}');`;
	}
}