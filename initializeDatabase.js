/**
 * initializeDatabase.js
 * 
 * Handles initialization and startup for the database.
 */

import Importer from 'mysql-import';
import mysql from 'mysql';

/**
 * Initializes the database from a MySQL Connection
 * 
 * @param config Configuration settings {host, user, password, database, resetDBOnLaunch}
 */
function initializeDatabase(db, config) {
	const importer = new Importer({ host: config.host, user: config.user, password: config.password });

	let promise = new Promise((resolve, reject) => {
		try {
			db.connect((err) => {
				if (err) throw err;

				console.log(`Connected as ID: ${db.threadId}`);
			});

			if (config.resetDBOnLaunch) {
				let sql = `DROP DATABASE IF EXISTS EnbeeDatabase`;
				db.query(sql, (err) => {
					if (err) throw err;
					console.log(`Dropped database ${config.database}.`);
				});
			}

			importer.import(config.schema).then(() => {
				var files_imported = importer.getImported();
				console.log(`${files_imported.length} SQL file(s) imported.`);
				resolve(db);
			}).catch(err => {
				console.log(`Error Importing SQL: ${err}`);
				resolve(db);
			});

		}
		catch (e) {
			console.log("Error: " + e);
			reject(e);
		}

	});

	return promise;
}

export { initializeDatabase };