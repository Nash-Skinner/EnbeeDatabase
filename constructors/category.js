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

	getSchema() {
		return `Category(gameId, categoryId, categoryName)`;
	}

	getValues() {
		return `('${this.gameId}', '${this.categoryId}', '${this.categoryName}')`;
	}

	toSQL() {
		return this.getSchema() + ' VALUES' + this.getValues() + ';';
	}
}