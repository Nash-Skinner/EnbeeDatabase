/**
 * PlayedBy
 * 
 * Primary Key: {runId, gameId, categoryId, userId}
 */
 class PlayedBy {
    constructor(runId, gameId, categoryId, userId) {
        this.runId = runId;
		this.gameId = gameId;
		this.categoryId = categoryId;
        this.userId = userId;
    }
}

module.exports = PlayedBy;