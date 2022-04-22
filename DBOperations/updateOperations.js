/**
 * updateOperations.js
 * 
 * Defines functions for database updates.
 */

/**
 * Update an object in the database
 * 
 * @param {*} db SQL Comnnection
 * @param {*} table Table Name
 * @param {*} property Property Name
 * @param {*} value Old Value
 * @param {*} newValue New Value
 * @returns 
 */
export function updateWhereDb(db, table, property, value, newValue) {
	let sql = `UPDATE ${table} SET ${property} = '${newValue}' WHERE ${property} = '${value}'`;

	let promise = new Promise((resolve, reject) => {
		db.query(sql, (err, result) => {
			if (err) { reject(err); return; }
			resolve(result);
		});
	});

	return promise;
}