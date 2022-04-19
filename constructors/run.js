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

	toSQL() {
		return `INSERT INTO Run(runId, gameId, categoryId, runTime, placement, datePlayed) VALUES('${this.runId}', '${this.gameId}', '${this.categoryId}', '${this.runTime}', '${this.placement}', '${this.datePlayed}');`;
	}
}