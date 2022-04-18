/**
 * queryOperations.js
 * 
 * Defines functions for database queries.
 */

/**
 * Runs a generic SQL query, wrapped in a promise.
 * 
 * @param {*} db SQL Connection
 * @param {*} sql Full SQL Statement
 * @returns Promise for when the operation is complete
 */
export function runQueryDb(db, sql) {

	let promise = new Promise((resolve, reject) => {
		db.query(sql, (err, result) => {
			if (err) { reject(err); return; }
			resolve(result);
		});
	});

	return promise;
}

/**
 * Returns all tuples from a table.
 * 
 * @param {*} db SQL Connection
 * @param {*} table Name of the table to select from
 * @returns Promise for when the operation is complete
 */
export function getAllDb(db, table) {

	let promise = new Promise((resolve, reject) => {
		let sql = `SELECT * FROM ${table}`;
		db.query(sql, (err, result) => {
			if (err) { reject(err); return; }
			resolve(result);
		});
	});

	return promise;
}

/**
 * Returns joined table tuples.
 * 
 * @param {*} db SQL Connection
 * @param {*} table1 First table to join from
 * @param {*} table2 Second table to join from
 * @param {*} joinproperty1 Property to join on in the first table
 * @param {*} joinproperty2 Property to join on in the second table (can be left out, will default to the first property)
 * @returns Promise for when the operation is complete
 */
export function joinTableDb(db, table1, table2, joinproperty1, joinproperty2) {

	if(!joinproperty2) {
		joinproperty2 = joinproperty1;
	}

	let promise = new Promise((resolve, reject) => {
		let sql = `SELECT * FROM ${table1}, ${table2} WHERE ${table1}.${joinproperty1} = ${table2}.${joinproperty2}`;
		db.query(sql, (err, result) => {
			if (err) { reject(err); return; }
			resolve(result);
		});
	});

	return promise;
}

/**
 * Returns conditional joined table tuples.
 * 
 * @param {*} db SQL Connection
 * @param {*} table1 First table to join from
 * @param {*} table2 Second table to join from
 * @param {*} joinproperty1 Property to join on in the first table
 * @param {*} joinproperty2 Property to join on in the second table (can be left out, will default to the first property)
 * @param {*} whereproperty Property to test for in the second table
 * @param {*} wherevalue Value to test for in the second table
 * @returns Promise for when the operation is complete
 */
export function joinTableWhereDb(db, table1, table2, joinproperty1, joinproperty2, whereproperty, wherevalue) {

	if(!joinproperty2) {
		joinproperty2 = joinproperty1;
	}

	let promise = new Promise((resolve, reject) => {
		let sql = `SELECT * FROM ${table1}, ${table2} WHERE ${table1}.${joinproperty1} = ${table2}.${joinproperty2} AND ${table2}.${whereproperty} = '${wherevalue}'`;
		db.query(sql, (err, result) => {
			if (err) { reject(err); return; }
			resolve(result);
		});
	});

	return promise;
}

/**
 * Returns joined table tuples.
 * 
 * @param {*} db SQL Connection
 * @param {*} table1 First table to join from
 * @param {*} table2 Second table to join from
 * @param {*} table3 Third table to join from
 * @param {*} firstJoin Join property between tables 1 and 2
 * @param {*} secondJoin Join property between tables 2 and 3
 * @returns Promise for when the operation is complete
 */
 export function multiJoinTableDb(db, table1, table2, table3, firstJoin, secondJoin) {

	if(!joinproperty2) {
		joinproperty2 = joinproperty1;
	}

	let promise = new Promise((resolve, reject) => {
		let sql = `SELECT * FROM ${table1}, ${table2}, ${table3} WHERE ${table1}.${firstJoin} = ${table2}.${firstJoin} AND ${table2}.${secondJoin} = ${table3}.${secondJoin}`;
		db.query(sql, (err, result) => {
			if (err) { reject(err); return; }
			resolve(result);
		});
	});

	return promise;
}