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

	getSchema() {
		return `Variable(gameId, categoryId, variableId, variableValueId, variableName, variableValue)`;
	}

	getValues() {
		return `('${this.gameId}', '${this.categoryId}', '${this.variableId}', '${this.variableValueId}', '${this.variableName}', '${this.variableValue}')`;
	}

	toSQL() {
		return this.getSchema() + ' VALUES' + this.getValues() + ';';
	}
}