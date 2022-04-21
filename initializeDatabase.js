/**
 * initializeDatabase.js
 * 
 * Handles initialization and startup for the database.
 */

import Importer from 'mysql-import';
import { importGame } from './API Helpers/getSRDCData.js';

function connectDb(db) {

	let promise = new Promise((resolve, reject) => {
		db.connect((err) => {
			if (err) { reject(err); return; }
			resolve(`Connected as ID: ${db.threadId}`);
		});
	});

	return promise;
}

function resetDBOnLaunch(db, config) {

	let promise = new Promise((resolve, reject) => {
		if (config.resetDBOnLaunch) {
			let sql = `DROP DATABASE IF EXISTS ${config.database}`;
			db.query(sql, (err) => {
				if (err) { reject(err); return; }
				resolve(`Dropped database ${config.database}.`);
			});
		}
		else {
			resolve(`Did not reset Database.`);
		}
	});

	return promise;
}

function importSchema(db, config) {
	const importer = new Importer({ host: config.host, user: config.user, password: config.password });

	let promise = new Promise((resolve, reject) => {
		importer.import(config.schema).then(() => {
			var files_imported = importer.getImported();
			console.log(`${files_imported.length} SQL file(s) imported.`);
			resolve(db);
		}).catch(err => {
			console.log(`Error Importing SQL: ${err}`);
			resolve(db);
		});
	});

	return promise;
}

function addInitialData(db) {
	let promises = [];

	promises.push(importGame(db, 'crosscode'));
	promises.push(importGame(db, 'ahit'));
	promises.push(importGame(db, 'ash'));

	return Promise.all(promises);
}

/**
 * Initializes the database from a MySQL Connection
 * 
 * @param config Configuration settings {host, user, password, database, resetDBOnLaunch}
 */
export function initializeDatabase(db, config) {

	let promise = new Promise((resolve, reject) => {
		try {
			connectDb(db).then((result) => {
				console.log(result);

				resetDBOnLaunch(db, config).then((result) => {
					console.log(result);

					importSchema(db, config).then((db) => {
						useDatabase(db, config.database).then(() => {

							if (config.resetDBOnLaunch) {
								addInitialData(db).then(() => {
									resolve(db);
								}).catch((err) => {
									console.log(err);
									resolve(db);
								});
							}
							else {
								resolve(db);
							}

						});
					});
				});
			});
		}
		catch (e) {
			console.log("Error: " + e);
			reject(e);
		}

	});

	return promise;
}

export function useDatabase(db, database) {
	let promise = new Promise((resolve, reject) => {
		let sql = `USE ${database}`;
		db.query(sql, (err) => {
			if (err) { reject(err); return; }
			console.log(`Using database ${database}.`);
			resolve(db);
		});
	});

	return promise;
}