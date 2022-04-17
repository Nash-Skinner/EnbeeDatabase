/**
 * Runner
 * 
 * Primary Key: {userId}
 */
class Runner {
    constructor(userId, username, region, pronouns, joinDate) {
		this.userId = userId;
        this.username = username;
        this.region = region;
        this.pronouns = pronouns;
        this.joinDate = joinDate;
    }
}

export { Runner };