/**
 * getSRDCData.js
 * 
 * Handles everything related to the SRDC API
 */

import axios from 'axios';
import Game from '../constructors/game.js';
import Category from '../constructors/category.js'
import Variable from '../constructors/variable.js';
import Run from '../constructors/run.js';
import PlayedBy from '../constructors/playedBy.js';
import Runner from '../constructors/runner.js';
import RunHasVariable from '../constructors/runHasVariable.js';

import * as InsertDB from '../DBOperations/insertOperations.js';

/**
 * Import a Game into the Database
 * 
 * @param {*} db SQL Connection
 * @param {*} gameAbbrev SRDC Game Abbreviattion
 * @returns 
 */
export function importGame(db, gameAbbrev) {

	console.log(`Importing Game with Abbreviation: ${gameAbbrev}`);

	let promise = new Promise((resolve, reject) => {

		getGameAndCategoryInfo(gameAbbrev).then((gameCatInfo) => {
			let Games = new Game(gameCatInfo.id, gameCatInfo.abbreviation, gameCatInfo.names.international, gameCatInfo.released, gameCatInfo.weblink);
			console.log(`Found Game: ${Games.name}`);
			let Categories = [], Variables = [], Runs = [], RunHasVariables = [], PlayedBys = [], Runners = [];

			parseCategoriesAndVariables(gameCatInfo, Categories, Variables);
			const LeaderboardPromises = [];

			console.log(`Beginning Importing ${Categories.length} Categories`);

			for (let i = 0; i < Categories.length; i++) {
				let leaderboardPromise = grabLeaderboard(Categories[i].gameId, Categories[i].categoryId, Runs, RunHasVariables, PlayedBys, Runners);
				leaderboardPromise.then(() => {
					console.log(`Finished Importing ${Categories[i].categoryName}`);
				}).catch((error) => {
					console.log(`Error Importing ${Categories[i].categoryName}: ${error}`);
				});
				LeaderboardPromises.push(leaderboardPromise);
			}

			Promise.all(LeaderboardPromises).then(() => {
				console.log(`Finished Importing ${Games.name}: ${Categories.length} Categories, ${Variables.length} Variables, ${Runs.length} Runs, ${RunHasVariables.length} RunHasVariables, ${Runners.length} Runners, ${PlayedBys.length} PlayedBys`);

				InsertDB.insertDb(db, Games, true).then(() => {

					console.log(`Inserted Game: ${Games.name}`);
					InsertDB.insertArrayDb(db, Categories, true).then(() => {

						console.log(`Inserted ${Categories.length} Categories`);
						InsertDB.insertArrayDb(db, Variables, true).then(() => {

							console.log(`Inserted ${Variables.length} Variables`);
							InsertDB.insertArrayDb(db, Runs, true).then(() => {

								console.log(`Inserted ${Runs.length} Runs`);
								InsertDB.insertArrayDb(db, RunHasVariables, true).then(() => {

									console.log(`Inserted ${RunHasVariables.length} RunHasVariables`);
									InsertDB.insertArrayDb(db, Runners, true).then(() => {

										console.log(`Inserted ${Runners.length} Runners`);
										InsertDB.insertArrayDb(db, PlayedBys, true).then(() => {

											console.log(`Inserted ${PlayedBys.length} PlayedBys`);
											console.log(`Added to Database: ${Games.name}`);
											resolve();
										});
									});
								});
							});
						});
					});
				});

			}).catch((error) => {
				console.log(error);
			});
		});

	});

	return promise;
}

/**
 * Reads data from /games/[game]?embed=categories.variables
 * and parses them into Categories and Variables
 */
function parseCategoriesAndVariables(gameCatInfo, Categories, Variables) {

	for (let i = 0; i < gameCatInfo.categories.data.length; i++) {
		let category = gameCatInfo.categories.data[i];

		//categories should apply to the full game
		if (category['type'] != 'per-game') continue;

		let categoryObj = new Category(gameCatInfo.id, category.id, category.name);
		Categories.push(categoryObj);

		for (let j = 0; j < category.variables.data.length; j++) {
			let variable = category.variables.data[j];

			//should be a subcategory of a category
			if (!variable['is-subcategory']) continue;

			//should apply to the full game or to a category, not an individual level
			if (variable.scope.type == 'all-levels' || variable.scope.type == 'single-level') continue;

			for (let k in variable.values.values) {

				let variableObj = new Variable(gameCatInfo.id, category.id, variable.id, k, variable.name, variable.values.values[k].label);
				Variables.push(variableObj);
			}
		}
	}
}

/**
 * Grabs, reads, and parse data from /leaderboards/[game]/categories/[category]?embed=players,variables
 * and places it into PlayedBys and Runners
 */
function grabLeaderboard(gameId, categoryId, Runs, RunHasVariables, PlayedBys, Runners) {
	let promise = new Promise((resolve, reject) => {
		let leaderboardPromise = getGameCategoryLeaderboard(gameId, categoryId);
		leaderboardPromise.then((leaderboard) => {
			parseLeaderboardRunsAndRunners(leaderboard, Runs, RunHasVariables, PlayedBys, Runners);
			resolve();
		}).catch((error) => {
			reject(error);
		});
	});

	return promise;
}

/**
 * Parses the leaderboard data into Runs, PlayedBys, and Runners
 */
function parseLeaderboardRunsAndRunners(leaderboard, Runs, RunHasVariables, PlayedBys, Runners) {

	for (let i = 0; i < leaderboard.runs.length; i++) {
		let run = leaderboard.runs[i].run;
		let runObj = new Run(run.id, run.game, run.category, run.times.primary_t, leaderboard.runs[i].place, run.date);

		for (let k in run.values) {
			let runHasVariableObj = new RunHasVariable(run.id, run.game, run.category, k, run.values[k]);
			RunHasVariables.push(runHasVariableObj);
		}

		for (let j = 0; j < run.players.length; j++) {
			let player = run.players[j];

			if (player.rel == 'guest') continue;

			let playerObj = new PlayedBy(run.id, run.game, run.category, player.id);
			PlayedBys.push(playerObj);
		}

		Runs.push(runObj);
	}

	for (let i = 0; i < leaderboard.players.data.length; i++) {
		let runner = leaderboard.players.data[i];

		if (runner.rel == 'guest') continue;

		let runnerName = "NULL";
		let regionName = "NULL";

		if (runner.names) {
			runnerName = runner.names.international;
		}

		if (runner.location) {
			regionName = runner.location.country.names.international;
		}

		let runnerObj = new Runner(runner.id, runnerName, regionName, runner.signup);
		Runners.push(runnerObj);
	}
}

/**
 * Finds Game, Category, and Variable information given an srdc game abbreviation
 */
function getGameAndCategoryInfo(gameAbbrev) {

	let promise = new Promise((resolve, reject) => {
		axios.get(`https://speedrun.com/api/v1/games/${gameAbbrev}?embed=categories.variables`)
			.then(response => {
				resolve(response.data.data);
			})
			.catch(error => {
				reject(error);
			});
	});

	return promise;
}

/**
 * Finds the leaderboard for a given game and category (needs to be mapped to variables for the real leaderboard)
 */
function getGameCategoryLeaderboard(gameId, categoryId) {
	let promise = new Promise((resolve, reject) => {
		axios.get(`https://speedrun.com/api/v1/leaderboards/${gameId}/category/${categoryId}?embed=players,variables`)
			.then(response => {
				resolve(response.data.data);
			})
			.catch(error => {
				reject(error);
			});
	});

	return promise;
}