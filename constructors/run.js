/**
 * Run
 * 
 * Primary Key: {runId, gameId, categoryId}
 */
export default class Run {
	constructor(runId, gameId, categoryId, runTime, placement, datePlayed, isObsolete, runDescription) {
		this.runId = runId;
		this.gameId = gameId;
		this.categoryId = categoryId;
		this.runTime = runTime;
		this.placement = placement;
		this.datePlayed = datePlayed;
		this.isObsolete = isObsolete;
		this.runDescription = runDescription;
	}

	toSQL() {
		return `INSERT INTO Run(runId, gameId, categoryId, runTime, placement, datePlayed, isObsolete, runDescription) VALUES('${this.runId}', '${this.gameId}', '${this.categoryId}', '${this.runTime}', '${this.placement}', '${this.datePlayed}', '${this.isObsolete}', '${this.runDescription}');`;
	}
}