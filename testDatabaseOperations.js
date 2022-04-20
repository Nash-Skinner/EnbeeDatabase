/**
 * testDatabaseOperations.js
 * 
 * Testing space for operations to make sure things are working.
 */

import Game from './constructors/game.js';
import Category from './constructors/category.js';
import Runner from './constructors/runner.js';
import Run from './constructors/run.js';
import PlayedBy from './constructors/playedBy.js';

import * as InsertDB from './DBOperations/insertOperations.js';
import * as QueryDB from './DBOperations/queryOperations.js';
import Promise from 'bluebird';

import { importGame } from './API Helpers/getSRDCData.js';

function insertTestData(db) {
	let testDataPromise = new Promise((resolve, reject) => {

		const Games = [new Game('yd4ljx1e', 'ahit', 'A Hat in Time', '2017', 'https://www.speedrun.com/ahit'), 
		new Game('ldez0jd3', 'crosscode', 'CrossCode', '2018', 'https://www.speedrun.com/crosscode')];

		const Categories = [new Category('yd4ljx1e', 'anypercentcategory', 'Any%'),
		new Category('yd4ljx1e', 'atpcategory', 'ATP'),
		new Category('ldez0jd3', 'anypercentcategory', 'Any% NMG')];

		const Runners = [new Runner('user1', 'EpicYoshiMaster', 'United States', '2018-01-17'),
		new Runner('user2', 'MaybeEpicYoshiMaster', 'United States', '2022-04-17')];

		const Runs = [new Run('run1', 'yd4ljx1e', 'anypercentcategory', '1:52.859', '1', '2019-05-17'),
		new Run('run2', 'yd4ljx1e', 'atpcategory', '12:11:52.60', '54', '2025-05-17')];

		const PlayedBys = [new PlayedBy('run1', 'yd4ljx1e', 'anypercentcategory', 'user1'),
		new PlayedBy('run2', 'yd4ljx1e', 'atpcategory', 'user2')];

		const GamesPromises = [], CategoriesPromises = [], RunnerPromises = [], RunPromises = [], PlayedByPromises = [];

		try {
			for(let i = 0; i < Games.length; i++) {
				let insertGamePromise = InsertDB.insertDb(db, Games[i]);
				GamesPromises.push(insertGamePromise);
			}

			Promise.join(GamesPromises, () => {

				for(let i = 0; i < Categories.length; i++) {
					let insertCategoryPromise = InsertDB.insertDb(db, Categories[i]);
					CategoriesPromises.push(insertCategoryPromise);
				}

				Promise.join(CategoriesPromises, () => {
					
					for(let i = 0; i < Runners.length; i++) {
						let insertRunnerPromise = InsertDB.insertDb(db, Runners[i]);
						RunnerPromises.push(insertRunnerPromise);
					}

					Promise.join(RunnerPromises, () => {

						for(let i = 0; i < Runs.length; i++) {
							let insertRunPromise = InsertDB.insertDb(db, Runs[i]);
							RunPromises.push(insertRunPromise);
						}

						Promise.join(RunPromises, () => {
							
							for(let i = 0; i < PlayedBys.length; i++) {
								let insertPlayedByPromise = InsertDB.insertDb(db, PlayedBys[i]);
								PlayedByPromises.push(insertPlayedByPromise);
							}

							Promise.join(PlayedByPromises, () => {
								resolve();
							});

						});
					});
				});
			});
		}
		catch (err) {
			console.log(err);
			reject();
		}

	});

	return testDataPromise;
}

export function testDBOperations(db) {

	importGame(db, 'crosscode');

	/*
	insertTestData(db).then(() => {
		console.log('Inserted test data');

		let gameToCategory = QueryDB.joinTableDb(db, 'Game', 'Category', 'gameId');

		gameToCategory.then((result) => {
			console.log('All Game JOIN Categories: ' + JSON.stringify(result, undefined, 2));
		});

		let runByRunnerSQL = 'SELECT * FROM Run, PlayedBy, Runner WHERE Run.runId = PlayedBy.runId AND Run.gameId = PlayedBy.gameId AND Run.categoryId = PlayedBy.categoryId AND Runner.userId = PlayedBy.userId';

		let runByRunner = QueryDB.runQueryDb(db, runByRunnerSQL);

		runByRunner.then((result) => {
			console.log('All Runs JOIN Runners JOIN PlayedBy: ' + JSON.stringify(result, undefined, 2));
		});
	});*/
}