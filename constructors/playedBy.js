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

	toSQL() {
		return `INSERT INTO PlayedBy(runId, gameId, categoryId, userId) VALUES('${this.runId}', '${this.gameId}', '${this.categoryId}', '${this.userId}');`;
	}
}