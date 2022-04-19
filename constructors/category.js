/**
 * Category
 * 
 * Primary Key: {gameId, categoryId}
 */
export default class Category {
    constructor(gameId, categoryId, categoryName) {
		this.gameId = gameId;
		this.categoryId = categoryId;
        this.categoryName = categoryName;
    }

	toSQL() {
		return `INSERT INTO Category(gameId, categoryId, categoryName) VALUES('${this.gameId}', '${this.categoryId}', '${this.categoryName}');`;
	}
}