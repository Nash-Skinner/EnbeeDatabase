/**
 * ModeratorFor
 * 
 * Primary Key: {gameId, userId}
 */
class ModeratorFor {
    constructor(gameId, userId) {
        this.gameId = gameId;
        this.userId = userId;
    }
}

export { ModeratorFor };