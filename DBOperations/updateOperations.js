/**
 * updateOperations.js
 * 
 * Defines functions for database updates.
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