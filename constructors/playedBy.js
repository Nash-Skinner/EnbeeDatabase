/**
 * PlayedBy
 * 
 * Primary Key: {runId, gameId, categoryId, userId}
 */
export default class PlayedBy {
    constructor(runId, gameId, categoryId, userId) {
        this.runId = runId;
		this.gameId = gameId;
		this.categoryId = categoryId;
        this.userId = userId;
    }

	getSchema() {
		return `PlayedBy(runId, gameId, categoryId, userId)`;
	}

	getValues() {
		return `('${this.runId}', '${this.gameId}', '${this.categoryId}', '${this.userId}')`;
	}

	toSQL() {
		return this.getSchema() + ' VALUES' + this.getValues() + ';';
	}
}