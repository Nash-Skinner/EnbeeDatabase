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
		UserOps.getGameCategoryRuns(db, req.params.gameId, req.params.categoryId).then((runs) => {
			res.json(runs);
		});
    })

    // Delete Run from Table
    .post('/api/run/delete/:id', (req,res) => {
        db.query(`DELETE FROM run WHERE runId = \'${req.params.id}\'`, (err, data) => {
                if(err) throw err;
        });
    })

    .listen(port, () => console.log(`Server Started on port ${port}`));
