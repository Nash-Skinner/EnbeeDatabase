import express from 'express';
import config from './config.json' assert{ type: "json" };
import { initializeDatabase, useDatabase } from './initializeDatabase.js';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import mysql from 'mysql';
import Game from './constructors/game.js';

import { testDBOperations } from './testDatabaseOperations.js';
import { response } from 'express';

const db = mysql.createConnection({host: config.host, user: config.user, password: config.password});
initializeDatabase(db, config).then(() => {
	useDatabase(db, config.database).then(() => {
		testDBOperations(db); 
	});
});
const app = express()
const port = process.env.PORT || 3000;

app
    .use(morgan('dev'))
    .use(express.static('public'))
    .use(bodyParser.urlencoded({extended: true}))
    .use(bodyParser.json())

    .set('view engine', 'ejs')

    // Get Games Table
    .get('/api/game', (req,res) => {
        db.query("SELECT * FROM game ORDER BY name", (err, data) => {
            res.json(data);
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
        db.query(`SELECT * FROM category WHERE gameId = \'${req.params.id}\' ORDER BY categoryName`, (err, data) => {
            res.json(data);
        });
    })

    // Get Run Table
    .get('/api/run/:id', (req,res) => {
        db.query(`SELECT * FROM run WHERE categoryId = \'${req.params.id}\' ORDER BY placement`, (err, data) => {
            res.json(data);
        });
    })

    .listen(port, () => console.log(`Server Started on port ${port}`));
