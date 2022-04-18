/**
 * insertOperations.js
 * 
 * Defines functions for inserting data into the database.
 */

function insertDb(db, data) {

	let promise = new Promise((resolve, reject) => {

		let sql = data.toSQL();

		console.log(`Running SQL: ${sql}`);
		db.query(sql, (err) => {
			if(err) { reject(err); return; }

			console.log(`Inserted ${data.constructor.name}`);
			resolve();
		});
	});

	return promise;
}

export { insertDb };