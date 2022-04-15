/**
 * Category
 * 
 * Primary Key: {gameId, categoryId}
 */
class Category {
    constructor(gameId, categoryId, categoryName, rules) {
		this.gameId = gameId;
		this.categoryId = categoryId;
        this.categoryName = categoryName;
        this.rules = rules;
    }
}

module.exports = Category;