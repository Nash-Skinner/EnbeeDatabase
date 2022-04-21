import express from 'express';
import config from './config.json' assert{ type: "json" };
import { initializeDatabase, useDatabase } from './initializeDatabase.js';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import mysql from 'mysql';
import Game from './constructors/game.js';
import cors from 'cors';

import { testDBOperations } from './testDatabaseOperations.js';
import * as UserOps from './userOperations.js';

const db = mysql.createConnection({host: config.host, user: config.user, password: config.password});
initializeDatabase(db, config).then(() => {
	testDBOperations(db);
});
const app = express()
const port = process.env.PORT || 3000;

app.use(cors());

app
    .use(morgan('dev'))
    .use(express.static('public'))
    .use(bodyParser.urlencoded({extended: true}))
    .use(bodyParser.json())

    .set('view engine', 'ejs')

    // Get Games Table
    .get('/api/game', (req,res) => {
		UserOps.getAllGames(db).then((games) => {
			res.json(games);
		});
    })

    // Post to Game Table
    .post('/api/game', async(req,res) => {
        const body = req.body;
        const intGame = new Game(body.gameId, body.abbrev, body.gameName, body.releaseYear, body.weblink);

        db.query(intGame.toSQL());
        res.redirect('..')
    })

    // Get Category Table
    .get('/api/category/:id', (req,res) => {
		UserOps.getGameCategories(db, req.params.id).then((categories) => {
			res.json(categories);
		});
    })

    // Get Run Table
    .get('/api/run/:gameId/:categoryId', (req,res) => {
		UserOps.getGameCategoryRunsAndRunners(db, req.params.gameId, req.params.categoryId).then((runs) => {
			res.json(runs);
		});
    })

	.get('/api/newgame/:abbrev', (req,res) => {
		console.log(`Received ${req.params.abbrev}`);
		UserOps.addGame(db, req.params.abbrev).then(() => {
			res.json({success: true});
		});
	})

	.get('/api/stats/:gameId/:categoryId', (req,res) => {
		UserOps.getTotalCategoryTimeAll(db, req.params.gameId).then((data) => {
			UserOps.getRunnersWithMoreThanRuns(db, 5).then((runners) => {
				UserOps.getSlowestRun(db).then((slowest) => {
					UserOps.getFastestRun(db).then((fastest) => {
						UserOps.getRegionBreakdown(db, req.params.gameId, req.params.categoryId).then((regions) => {
							let dataPackage = {
								category: data,
								runners: runners,
								extreme: [],
								regions: regions
							};
							dataPackage.extreme.push(fastest[0]);
							dataPackage.extreme.push(slowest[0]);
	
							res.json(dataPackage);
						});
					});
				});
			});
		});
	})

	.get('/api/deletegame/:abbrev', (req,res) => {
		console.log(`Received ${req.params.abbrev}`);
		UserOps.deleteGame(db, req.params.abbrev).then(() => {
			res.json({success: true});
		});
	})

	.get('/api/updateusername/:oldUsername/:newUsername', (req,res) => {
		UserOps.updateUsername(db, req.params.oldUsername, req.params.newUsername).then(() => {
			res.json({success: true});
		});
	})

    // Delete Run from Table
    .post('/api/run/delete/:id', (req,res) => {
		UserOps.deleteGame(db, req.params.id);
    })

    .listen(port, () => console.log(`Server Started on port ${port}`));
