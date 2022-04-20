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
 * @param {*} ignoreDuplicates Whether to silently ignore duplicates
 * @returns Promise for when the operation is complete
 */
export function insertDb(db, data, ignoreDuplicates = false) {

	let promise = new Promise((resolve, reject) => {

		const command = `INSERT `+ ((ignoreDuplicates) ? `IGNORE ` : ``) +`INTO `;
		const sql = command + data.toSQL();

		//console.log(`Running SQL: ${sql}`);
		db.query(sql, (err) => {
			if(err) { reject(err); return; }

			//console.log(`Inserted ${data.constructor.name}`);
			resolve();
		});
	});

	return promise;
}

/**
 * Inserts an array of objects into the databaase
 * 
 * @param {*} db SQL Connection
 * @param {*} arrayData Array of objects to insert, individual elements must have a getSchema() and getValues() function
 * @param {*} ignoreDuplicates Whether to silently ignore duplicates
 * @returns Promise for when all objects have been inserted
 */
 export function insertArrayDb(db, arrayData, ignoreDuplicates = false) {

	let promise = new Promise((resolve, reject) => {

		let sql = `INSERT `+ ((ignoreDuplicates) ? `IGNORE ` : ``) +`INTO `;

		if(arrayData.length > 0) {
			sql += arrayData[0].getSchema() + ' VALUES';
			sql += arrayData[0].getValues();
		}

		for(let i = 1; i < arrayData.length; i++) {
			sql += ', ' + arrayData[i].getValues();
		}

		sql += ";"
		db.query(sql, (err) => {
			if(err) { reject(err); return; }

			resolve();
		});
	});

	return promise;
}