/**
 * ModeratorFor
 * 
 * Primary Key: {gameId, userId}
 */
export default class ModeratorFor {
    constructor(gameId, userId) {
        this.gameId = gameId;
        this.userId = userId;
    }

	toSQL() {
		return `INSERT INTO ModeratorFor(gameId, userId) VALUES('${this.gameId}', '${this.userId}');`;
	}
}