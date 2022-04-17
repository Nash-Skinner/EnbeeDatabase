import express from 'express';
import config from './config.json' assert { type: "json" };
import { initializeDatabase } from './initializeDatabase.js';

import morgan from 'morgan';
import bodyParser from 'body-parser';
import { Prohairesis } from 'prohairesis';

const db = initializeDatabase(config);
const app = express()
const port = process.env.PORT || 3000;
const mySQLString = 'datasource=127.0.0.1;port=3306;username=Creator;password=Admin;database=enbeedatabase;';
const database = new Prohairesis(mySQLString);

app
    .use(morgan('dev'))
    .use(express.static('public'))
    .use(bodyParser.urlencoded({extended: false}))
    .use(bodyParser.json())

    .get('/api/game', async(req,res) => {
        const game = await database.query(`
            SELECT *
            FROM game
            ORDER BY gameId
        `);

        res.json(game)
    })

    .post('/api/game', async(req, res) => {
        const body = req.body;

        database.execute(`            
        INSERT INTO game (
            gameId,
            abbrev,
            name,
            platforms,
            releaseYear,
            weblink
        ) VALUES (
            @gameId,
            @abbrev,
            @name
            @platforms,
            @releaseYear,
            @weblink,
        )`, {
            gameId: body.gameId,
            abbrev: body.abbrev,
            name: body.name,
            platforms: body.platforms,
            releaseYear: body.releaseYear,
            weblink: body.weblink
        })

        res.json(req.body);
    })

    .listen(port, () => console.log(`Server Started on port ${port}`));
