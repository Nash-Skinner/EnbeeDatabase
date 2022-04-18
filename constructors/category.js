/**
 * Category
 * 
 * Primary Key: {gameId, categoryId}
 */
export default class Category {
    constructor(gameId, categoryId, categoryName, rules) {
		this.gameId = gameId;
		this.categoryId = categoryId;
        this.categoryName = categoryName;
        this.rules = rules;
    }

	toSQL() {
		return `INSERT INTO Category(gameId, categoryId, categoryName, rules) VALUES('${this.gameId}', ${this.categoryId}, '${this.categoryName}', '${this.rules}');`;
	}
}