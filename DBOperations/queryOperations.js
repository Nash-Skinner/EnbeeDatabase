/**
 * queryOperations.js
 * 
 * Defines functions for database queries.
 */

function getAllDb(db, table) {

	let promise = new Promise((resolve, reject) => {
		let sql = `SELECT * FROM ${table}`;
		db.query(sql, (err, result) => {
			if (err) { reject(err); return; }
			console.log(`Retrieved from ${table}.`);
			resolve(result);
		});
	});

	return promise;
}

export { getAllDb };