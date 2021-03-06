/**
 * Specifies functions for necessary user operations for ease of use.
 */

import { importGame } from './API Helpers/getSRDCData.js';
import * as DeleteDB from './DBOperations/deleteOperations.js'
import * as QueryDB from './DBOperations/queryOperations.js';
import * as UpdateDB from './DBOperations/updateOperations.js'

/**
 * Add a game to the Database
 */
export function addGame(db, gameAbbrev) {
	return importGame(db, gameAbbrev);
}

/**
 * Retrieve all games, in order
 */
export function getAllGames(db) {

	let sql = `SELECT * FROM game ORDER BY Name`;

	return QueryDB.runQueryDb(db, sql);
}

/**
 * Get all categories for a game
 */
export function getGameCategories(db, gameId) {
	
	let sql = `SELECT * FROM Category WHERE gameId = \'${gameId}\' ORDER BY categoryName`;

	return QueryDB.runQueryDb(db, sql);
}

/**
 * Get all runs for a game, category
 */
export function getGameCategoryRuns(db, gameId, categoryId) {

	let sql = `SELECT * FROM Run WHERE gameId = \'${gameId}\' AND categoryId = \'${categoryId}\' ORDER BY Placement`;

	let promise = new Promise((resolve, reject) => {
		QueryDB.runQueryDb(db, sql).then((result) => {

			result.forEach((run) => {
				run.runTime = convertToHMS(run.runTime);
				run.datePlayed = new Date(run.datePlayed).toISOString().split('T')[0];
			});

			resolve(result);
		});
	});

	return promise;
}

/**
 * Get Runs and Runners for a game, category
 */
export function getGameCategoryRunsAndRunners(db, gameId, categoryId) {
	
	let sqlSelect = `SELECT Run.runId, runTime, placement, datePlayed, username, region`;
	let sqlFrom = `FROM Run, PlayedBy, Runner`
	let sqlWhere = `WHERE Run.runId = PlayedBy.runId AND Run.gameId = PlayedBy.gameId AND Run.categoryId = PlayedBy.categoryId AND PlayedBy.userId = Runner.userId AND Run.gameId = \'${gameId}\' AND Run.categoryId = \'${categoryId}\'`;
	let sqlOrder = `ORDER BY Run.Placement`;

	let sql = `${sqlSelect} ${sqlFrom} ${sqlWhere} ${sqlOrder}`;

	let promise = new Promise((resolve, reject) => {
		QueryDB.runQueryDb(db, sql).then((result) => {

			result.forEach((playerRun) => {
				playerRun.runTime = convertToHMS(playerRun.runTime);

				if(!Number.isNaN(new Date(playerRun.datePlayed).getDate())) {
					playerRun.datePlayed = new Date(playerRun.datePlayed).toISOString().split('T')[0];
				}
				else {
					playerRun.datePlayed = "Unknown";
				}
			});

			resolve(result);
		});
	});

	return promise;
}

/**
 * Update a Runner's username in the database
 */
 export function updateUsername(db, oldUsername, newUsername) {
	return UpdateDB.updateWhereDb(db, 'Runner', 'username', oldUsername, newUsername);
}

/**
 * Delete a Game (and dependent components) from the database
 */
export function deleteGame(db, gameAbbrev) {
	return DeleteDB.deleteFromWhereDb(db, 'Game', 'abbrev', gameAbbrev);
}

/**
 * STATS: get the total time for each game
 */
export function getTotalGameTimeAll(db) {

	let sqlSelect = `SELECT name, Sum(runTime) AS totalTime`;
	let sqlFrom = `FROM Run, Game`;
	let sqlWhere = `WHERE Run.gameId = Game.gameId`;
	let sqlOrder = `GROUP BY Run.gameId ORDER BY totalTime`;
	
	let sql = `${sqlSelect} ${sqlFrom} ${sqlWhere} ${sqlOrder}`;

	let promise = new Promise((resolve, reject) => {
		QueryDB.runQueryDb(db, sql).then((result) => {
			result.forEach((game) => {
				game.totalTime = convertToHMS(game.totalTime);
			});

			resolve(result);
		});
	});

	return promise;
}

/**
 * STATS: Returns the numRuns runners with the most runs across all runners
 */
export function getRunnersWithMoreThanRuns(db, numRuns) {

	let sqlSelect = `SELECT username, Count(*) AS totalRuns`;
	let sqlFrom = `FROM Runner, PlayedBy, Run`;
	let sqlWhere = `WHERE Run.runId = PlayedBy.runId AND Run.gameId = PlayedBy.gameId AND Run.categoryId = PlayedBy.categoryId AND PlayedBy.userId = Runner.userId`;
	let sqlOrder = `GROUP BY username ORDER BY Count(*) DESC LIMIT ${numRuns}`;
	
	let sql = `${sqlSelect} ${sqlFrom} ${sqlWhere} ${sqlOrder}`;

	let promise = new Promise((resolve, reject) => {
		QueryDB.runQueryDb(db, sql).then((result) => {
			resolve(result);
		});
	});

	return promise;
}

/**
 * STATS: Finds the slowest run across all runs
 */
export function getSlowestRun(db) {

	
	let sqlSelect = `SELECT username, runTime`;
	let sqlFrom = `FROM Run, PlayedBy, Runner`;
	let sqlWhere = `WHERE Run.runId = PlayedBy.runId AND Run.gameId = PlayedBy.gameId AND Run.categoryId = PlayedBy.categoryId AND PlayedBy.userId = Runner.userId AND CAST(runTime AS INT) >= (SELECT MAX(CAST(runTime AS INT)) FROM Run)`;
	let sqlOrder = ``;
	
	let sql = `${sqlSelect} ${sqlFrom} ${sqlWhere} ${sqlOrder}`;

	let promise = new Promise((resolve, reject) => {
		QueryDB.runQueryDb(db, sql).then((result) => {

			result.forEach((game) => {
				game.runTime = convertToHMS(game.runTime);
			});

			resolve(result);
		});
	});

	return promise;
}

/**
 * STATS: Finds the fastest run across all runs
 */
export function getFastestRun(db) {

	let sqlSelect = `SELECT username, runTime`;
	let sqlFrom = `FROM Run, PlayedBy, Runner`;
	let sqlWhere = `WHERE Run.runId = PlayedBy.runId AND Run.gameId = PlayedBy.gameId AND Run.categoryId = PlayedBy.categoryId AND PlayedBy.userId = Runner.userId AND CAST(runTime AS INT) <= (SELECT MIN(CAST(runTime AS INT)) FROM Run)`;
	let sqlOrder = ``;
	
	let sql = `${sqlSelect} ${sqlFrom} ${sqlWhere} ${sqlOrder}`;

	let promise = new Promise((resolve, reject) => {
		QueryDB.runQueryDb(db, sql).then((result) => {

			result.forEach((game) => {
				game.runTime = convertToHMS(game.runTime);
			});

			resolve(result);
		});
	});

	return promise;
}

/**
 * STATS: Get the total time for each category in a game
 */
export function getTotalCategoryTimeAll(db, gameId) {

	let sqlSelect = `SELECT categoryName, Sum(runTime) AS totalTime`;
	let sqlFrom = `FROM Run, Category`;
	let sqlWhere = `WHERE Run.categoryId = Category.categoryId AND Run.gameId = '${gameId}'`;
	let sqlOrder = `GROUP BY Category.categoryId ORDER BY categoryName`;
	
	let sql = `${sqlSelect} ${sqlFrom} ${sqlWhere} ${sqlOrder}`;

	let promise = new Promise((resolve, reject) => {
		QueryDB.runQueryDb(db, sql).then((result) => {
			result.forEach((game) => {
				game.totalTime = convertToHMS(game.totalTime);
			});

			resolve(result);
		});
	});

	return promise;
}

/**
 * STATS: Return a percentage breakdown of the 5 most played regions for a category
 */
export function getRegionBreakdown(db, gameId, categoryId) {

	let sqlSelect = `SELECT region, Count(*) * 100 / SUM(Count(*)) OVER() AS percentage`;
	let sqlFrom = `FROM Run, PlayedBy, Runner`
	let sqlWhere = `WHERE Run.runId = PlayedBy.runId AND Run.gameId = PlayedBy.gameId AND Run.categoryId = PlayedBy.categoryId AND PlayedBy.userId = Runner.userId AND Run.gameId = \'${gameId}\' AND Run.categoryId = \'${categoryId}\'`;
	let sqlOrder = `GROUP BY region ORDER BY percentage DESC, region ASC LIMIT 5`;

	let sql = `${sqlSelect} ${sqlFrom} ${sqlWhere} ${sqlOrder}`;

	let promise = new Promise((resolve, reject) => {
		QueryDB.runQueryDb(db, sql).then((result) => {
			resolve(result);
		});
	});

	return promise;
}

//
// Helper Functions
//

function appendZeros(time, checkHundred = false) {
	if(checkHundred && time < 100) {
		time = "0" + time;
	}

	if(time < 10) {
		time = "0" + time;
	}

	return time;
}

function convertToHMS(runTime) {
	let time = runTime;

	let hours = Math.floor(runTime / 3600);
	time = time - hours * 3600;

	let minutes = Math.floor(time / 60);
	time = time - minutes * 60;

	let seconds = Math.floor(time);
	time = time - seconds;

	let milliseconds = Math.floor(time * 1000);

	return `${hours}h ${appendZeros(minutes)}m ${appendZeros(seconds)}s ${appendZeros(milliseconds)}ms`;
}