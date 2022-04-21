/**
 * testDatabaseOperations.js
 * 
 * Testing space for operations to make sure things are working.
 */
import * as UserOps from './userOperations.js';

export function testDBOperations(db) {

	UserOps.deleteGame(db, 'yd4ljx1e').then(() => {
		console.log('Deleted game.');
		UserOps.getGameCategoryRunsAndRunners(db, 'yd4ljx1e', 'xk9g0zvd').then((data) => {
			console.log(data);
		});
	});
	
	/*
	UserOps.getGameCategoryRunsAndRunners(db, 'yd4ljx1e', 'xk9g0zvd').then((data) => {
		console.log(data);
	});*/
}