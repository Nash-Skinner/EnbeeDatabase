/**
 * RunHasVariable
 * 
 * Primary Key: {runId, gameId, categoryId, variableId, variableValueId}
 */
 export default class RunHasVariable {
    constructor(runId, gameId, categoryId, variableId, variableValueId) {
        this.runId = runId;
		this.gameId = gameId;
		this.categoryId = categoryId;
		this.variableId = variableId;
		this.variableValueId = variableValueId;
    }

	getSchema() {
		return `RunHasVariable(runId, gameId, categoryId, variableId, variableValueId)`;
	}

	getValues() {
		return `('${this.runId}', '${this.gameId}', '${this.categoryId}', '${this.variableId}', '${this.variableValueId}')`;
	}

	toSQL() {
		return this.getSchema() + ' VALUES' + this.getValues() + ';';
	}
}