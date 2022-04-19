/**
 * Variable
 * 
 * Primary Key: {gameId, categoryId, variableId, variableValueId}
 */
export default class Variable {
	constructor(gameId, categoryId, variableId, variableValueId, variableName, variableValue) {
		this.gameId = gameId;
		this.categoryId = categoryId;
		this.variableId = variableId;
		this.variableValueId = variableValueId;
		this.variableName = variableName;
		this.variableValue = variableValue;
    }

	toSQL() {
		return `INSERT INTO Variable(gameId, categoryId, variableId, variableName) VALUES('${this.gameId}', '${this.categoryId}', '${this.variableId}', '${this.variableValueId}', '${this.variableName}', '${this.variableValue}');`;
	}
}