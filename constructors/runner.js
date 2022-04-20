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

	getSchema() {
		return `Runner(userId, username, region, joinDate)`;
	}

	getValues() {
		return `('${this.userId}', '${this.username}', '${this.region}', '${this.joinDate}')`;
	}

	toSQL() {
		return this.getSchema() + ' VALUES' + this.getValues() + ';';
	}
}