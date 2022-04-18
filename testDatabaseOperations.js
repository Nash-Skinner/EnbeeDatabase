/**
 * testDatabaseOperations.js
 * 
 * Testing space for operations to make sure things are working.
 */

import Game from './constructors/game.js';
import { insertDb } from './DBOperations/insertOperations.js';
import { getAllDb } from './DBOperations/queryOperations.js';
import Promise from 'bluebird';

function testDBOperations(db) {
	// Insert Game
	const hatGame = new Game('yd4ljx1e', 'ahit', 'A Hat in Time', 'PS4, XboxOne, PC, Switch, PS5, XboxSeriesX', '2017', 'https://www.speedrun.com/ahit');
	const crossCodeGame = new Game('ldez0jd3', 'crosscode', 'CrossCode', 'PS4, XboxOne, PC, Mac, Linux, Switch', '2018', 'https://www.speedrun.com/crosscode');

	try {
		let insertHatPromise = insertDb(db, hatGame);
		let insertCrossCodePromise = insertDb(db, crossCodeGame);

		Promise.join(insertHatPromise, insertCrossCodePromise, (hatResult, crossCodeResult) => {
			let getAllDbGames = getAllDb(db, 'Game');

			getAllDbGames.then((result) => {
				console.log(result);
			});
		});
	}
	catch(err) {
		console.log(err);
	}
}

export { testDBOperations };