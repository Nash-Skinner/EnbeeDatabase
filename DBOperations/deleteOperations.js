/**
 * deleteOperations.js
 * 
 * Defines functions for deleting data from the database.
 */

/**
 * Deletes all tuples from a table.
 * 
 * @param {*} db SQL Connection
 * @param {*} table Name of the table to delete from
 * @returns Promise for when the operation is complete
 */
export function deleteAllDb(db, table) {

	let promise = new Promise((resolve, reject) => {
		let sql = `DELETE FROM ${table}`;
		db.query(sql, (err) => {
			if (err) { reject(err); return; }

			console.log(`Deleted from ${table}.`);
			resolve();
		});
	});

	return promise;
}

/**
 * Deletes tuples which match a given property value.
 * 
 * @param {*} db SQL Connection
 * @param {*} table Name of the table to delete from
 * @param {*} property Property of the table to test
 * @param {*} value Value for deletion
 * @returns Promise for when the operation is complete
 */
export function deleteFromWhereDb(db, table, property, value) {
	
	let promise = new Promise((resolve, reject) => {
		let sql = `DELETE FROM ${table} WHERE ${property} = '${value}'`;
		db.query(sql, (err) => {
			if (err) { reject(err); return; }

			console.log(`Deleted from ${table}.`);
			resolve();
		});
	});

	return promise;
}