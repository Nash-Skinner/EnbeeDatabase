//HTTPS Request Support
import axios from 'axios';
//import Promise from 'bluebird';

import Game from '../constructors/game.js';
import Category from '../constructors/category.js'
import Variable from '../constructors/variable.js';
import Run from '../constructors/run.js';
import PlayedBy from '../constructors/playedBy.js';
import Runner from '../constructors/runner.js';

export function importGame(db, gameAbbrev) {

	console.log(`Importing Game with Abbreviation: ${gameAbbrev}`);

	getGameAndCategoryInfo(gameAbbrev).then((gameCatInfo) => {
		let Games = new Game(gameCatInfo.id, gameCatInfo.abbreviation, gameCatInfo.names.international, gameCatInfo.released, gameCatInfo.weblink);
		console.log(`Found Game: ${Games.name}`);
		let Categories = [], Variables = [], Runs = [], PlayedBys = [], Runners = [];

		parseCategoriesAndVariables(gameCatInfo, Categories, Variables);
		const LeaderboardPromises = [];

		console.log(`Beginning Importing ${Categories.length} Categories`);

		for (let i = 0; i < Categories.length; i++) {
			let leaderboardPromise = grabLeaderboard(Categories[i].gameId, Categories[i].categoryId, Runs, PlayedBys, Runners);
			leaderboardPromise.then(() => {
				console.log(`Finished Importing ${Categories[i].categoryName}`);
			}).catch((error) => {
				console.log(`Error Importing ${Categories[i].categoryName}: ${error}`);
			});
			LeaderboardPromises.push(leaderboardPromise);
		}

		Promise.all(LeaderboardPromises).then(() => {
			console.log(`Finished Importing ${Games.name}: ${Categories.length} Categories, ${Variables.length} Variables, ${Runs.length} Runs, ${PlayedBys.length} PlayedBys, ${Runners.length} Runners`);
		}).catch((error) => {
			console.log(error);
		});
	});
}

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

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function grabLeaderboard(gameId, categoryId, Runs, PlayedBys, Runners) {
	let promise = new Promise((resolve, reject) => {
		let leaderboardPromise = getGameCategoryLeaderboard(gameId, categoryId);
		leaderboardPromise.then((leaderboard) => {
			parseLeaderboardRunsAndRunners(leaderboard, Runs, PlayedBys, Runners);
			resolve();
		}).catch((error) => {
			reject(error);
		});
	});

	return promise;
}

function parseLeaderboardRunsAndRunners(leaderboard, Runs, PlayedBys, Runners) {

	for (let i = 0; i < leaderboard.runs.length; i++) {
		let run = leaderboard.runs[i].run;
		let runObj = new Run(run.id, run.game, run.category, run.times.primary, leaderboard.runs[i].place, run.date);

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