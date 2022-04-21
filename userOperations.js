/**
 * Specifies functions for necessary user operations for ease of use.
 */

import { importGame } from './API Helpers/getSRDCData.js';
import * as DeleteDB from './DBOperations/deleteOperations.js'
import * as QueryDB from './DBOperations/queryOperations.js';
import * as UpdateDB from './DBOperations/updateOperations.js'

export function addGame(db, gameAbbrev) {
	return importGame(db, gameAbbrev);
}

export function getAllGames(db) {

	let sql = `SELECT * FROM game ORDER BY Name`;

	return QueryDB.runQueryDb(db, sql);
}

export function getGameCategories(db, gameId) {
	
	let sql = `SELECT * FROM Category WHERE gameId = \'${gameId}\' ORDER BY categoryName`;

	return QueryDB.runQueryDb(db, sql);
}

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
				playerRun.datePlayed = new Date(playerRun.datePlayed).toISOString().split('T')[0];
			});

			resolve(result);
		});
	});

	return promise;
}

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

export function getTotalGameCategoryTime(db, gameId, categoryId) {

	let sql = `SELECT SUM(runTime) AS totalTime FROM Run WHERE gameId = \'${gameId}\' AND categoryId = \'${categoryId}\'`;

	let promise = new Promise((resolve, reject) => {
		QueryDB.runQueryDb(db, sql).then((result) => {
			resolve(convertToHMS(result[0].totalTime));
		});
	});

	return promise;
}

export function updateUsername(db, oldUsername, newUsername) {
	return UpdateDB.updateWhereDb(db, 'Runner', 'username', oldUsername, newUsername);
}

export function deleteGame(db, gameAbbrev) {
	return DeleteDB.deleteFromWhereDb(db, 'Game', 'abbrev', gameAbbrev);
}