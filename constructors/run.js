/**
 * Run
 * 
 * Primary Key: {runId, gameId, categoryId}
 */
class Run {
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
}

export { Run };