/**
 * initializeDatabase.js
 * 
 * Handles initialization and startup for the database.
 */

import Importer from 'mysql-import';
import mysql from 'mysql';

/**
 * Initializes the database and returns a MySQL Database Connection
 * 
 * @param config Configuration settings {host, user, password, database, resetDBOnLaunch}
 */
function initializeDatabase(config) {
	const importer = new Importer({host: config.host, user: config.user, password: config.password});
	const db = mysql.createConnection({host: config.host, user: config.user, password: config.password});

	// Connect to MySql
	db.connect(err => {
    	if(err){
        	throw err;
    	}
    	console.log("MySQL Connected")
	});
	
	// Start with Empty Database (if requested)
	if(config.resetDBOnLaunch) {
		let sql = `DROP DATABASE IF EXISTS ${config.database}`;
		db.query(sql, (err) => {
			if(err) {
				throw err;
			}
		console.log("Reset Database");
		});
	}

	// Imports SQL Schema
	importer.import('./EnbeeSchema.sql').then(() => {
    	var files_imported = importer.getImported();
    	console.log(`${files_imported.length} SQL file(s) imported.`);
	}).catch(err => {
    	console.log("Database Already Initialized")
	});
}

export { initializeDatabase };