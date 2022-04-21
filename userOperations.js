/**
 * Specifies functions for necessary user operations for ease of use.
 */

import { importGame } from './API Helpers/getSRDCData.js';
import * as QueryDB from './DBOperations/queryOperations.js';

export function addGame(db, gameAbbrev) {
	importGame(db, gameAbbrev);
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

	if(milliseconds < 100) {
		milliseconds = "0" + milliseconds;
	}

	if(milliseconds < 10) {
		milliseconds = "0" + milliseconds;
	}

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