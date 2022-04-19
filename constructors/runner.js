/**
 * Runner
 * 
 * Primary Key: {userId}
 */
export default class Runner {
    constructor(userId, username, region, joinDate) {
		this.userId = userId;
        this.username = username;
        this.region = region;
        this.joinDate = joinDate;
    }

	toSQL() {
		return `INSERT INTO Runner(userId, username, region, joinDate) VALUES('${this.userId}', '${this.username}', '${this.region}', '${this.joinDate}');`;
	}
}