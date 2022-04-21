/**
 * testDatabaseOperations.js
 * 
 * Testing space for operations to make sure things are working.
 */
import * as UserOps from './userOperations.js';

export function testDBOperations(db) {

	UserOps.getFastestRun(db).then((runs) => {
		console.log(runs);
	});

	UserOps.getSlowestRun(db).then((runs) => {
		console.log(runs);
	});

	UserOps.getRunnersWithMoreThanRuns(db, 5).then((runner) => {
		console.log(JSON.stringify(runner, undefined, 2));
	});

	/*
	UserOps.getTotalGameTimeAll(db).then((totals) => {
		console.log(totals);
	});*/

	/*
	UserOps.getTotalGameCategoryTime(db, 'yd4ljx1e', 'xk9g0zvd').then((time) => {
		console.log(time);
	});*/

	/*
	UserOps.deleteGame(db, 'yd4ljx1e').then(() => {
		console.log('Deleted game.');
		UserOps.getGameCategoryRunsAndRunners(db, 'yd4ljx1e', 'xk9g0zvd').then((data) => {
			console.log(data);
		});
	});*/
	
	/*
	UserOps.getGameCategoryRunsAndRunners(db, 'yd4ljx1e', 'xk9g0zvd').then((data) => {
		console.log(data);
	});*/
}