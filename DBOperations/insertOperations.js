/**
 * insertOperations.js
 * 
 * Defines functions for inserting data into the database.
 */

/**
 * Inserts an object into the database
 * 
 * @param {*} db SQL Connection
 * @param {*} data Object to insert, must have a toSQL() function 
 * @returns Promise for when the operation is complete
 */
export function insertDb(db, data) {

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