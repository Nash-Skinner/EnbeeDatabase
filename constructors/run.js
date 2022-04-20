/**
 * Run
 * 
 * Primary Key: {runId, gameId, categoryId}
 */
export default class Run {
	constructor(runId, gameId, categoryId, runTime, placement, datePlayed) {
		this.runId = runId;
		this.gameId = gameId;
		this.categoryId = categoryId;
		this.runTime = runTime;
		this.placement = placement;
		this.datePlayed = datePlayed;
	}

	getSchema() {
		return `Run(runId, gameId, categoryId, runTime, placement, datePlayed)`;
	}

	getValues() {
		return `('${this.runId}', '${this.gameId}', '${this.categoryId}', '${this.runTime}', '${this.placement}', '${this.datePlayed}')`;
	}

	toSQL() {
		return this.getSchema() + ' VALUES' + this.getValues() + ';';
	}
}