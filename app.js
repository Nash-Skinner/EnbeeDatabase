import express from 'express';
import config from './config.json' assert { type: "json" };
import { initializeDatabase } from './initializeDatabase.js';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import mysql from 'mysql';
import path from 'path';
import {fileURLToPath} from 'url';

const db = mysql.createConnection({host: config.host, user: config.user, password: config.password, database: config.database});
initializeDatabase(db, config);

const app = express();
const port = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app
    .use(morgan('dev'))
    .use(express.static(path.join(__dirname, 'public')))
    .use(bodyParser.urlencoded({extended: false}))
    .use(bodyParser.json())

    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'ejs')

    // Get Game Table
    .get('/api/game', async(req,res) => {
        var sql = "SELECT * FROM game ORDER BY gameId";
        database.query(sql, async (err, result, fields) => {
            if(err) throw err;
            // res.json(Object.values(JSON.parse(JSON.stringify(result))));
            res.forEach( (res) => {
                console.log(`${result.gameId} ${result.abbrev}`)
            });
            res.redirect('..');
        })
    })

    // Post to Game Table
    .post('/api/game', async(req, res) => {
        const body = req.body;

        //await db.query(`            
        const mySQLString = ("INSERT INTO game (gameId, abbrev, name, platforms, releaseYear, weblink) VALUES ('"+ body.gameId +"', '"+ body.abbrev +"', '"+ body.name +"', '"+ body.platforms +"', '"+ body.releaseYear +"', '"+ body.weblink +"')");
        database.query(mySQLString)

        res.redirect('/api/game');
    })

    // Post to SteamGame Table
    .post('/api/steamgame', async(req, res) => {
        const body = req.body;

        //await db.query(`            
        const mySQLString = ("INSERT INTO steamgame (appId, srdcGameId, developer, releaseDate, publisher, rating) VALUES ('"+ body.appId +"', '"+ body.srdcGameId +"', '"+ body.developer +"', '"+ body.releaseDate +"', '"+ body.publisher +"', '"+ body.rating +"')");
        database.query(mySQLString)

        res.redirect('..');
    })

    // Post to Category Table
    .post('/api/category', async(req, res) => {
        const body = req.body;

        //await db.query(`            
        const mySQLString = ("INSERT INTO category (gameId, categoryId, categoryName, rules) VALUES ('"+ body.gameId +"', '"+ body.categoryId +"', '"+ body.categoryName +"', '"+ body.rules +"')");
        database.query(mySQLString)

        res.redirect('..');
    })

    // Post to Runner Table
    .post('/api/runner', async(req, res) => {
        const body = req.body;

        //await db.query(`            
        const mySQLString = ("INSERT INTO runner (userId, username, region, pronouns, joinDate) VALUES ('"+ body.userId +"', '"+ body.username +"', '"+ body.region +"', '"+ body.pronouns +"', '"+ body.joinDate +"')");
        database.query(mySQLString)

        res.redirect('..');
    })

    // Post to Run Table
    .post('/api/run', async(req, res) => {
        const body = req.body;

        //await db.query(`            
        const mySQLString = ("INSERT INTO run (runId, gameId, categoryId, runTime, placement, datePlayed, isObsolete, runDescription) VALUES ('"+ body.runId +"', '"+ body.gameId +"', '"+ body.categoryId +"', '"+ body.runTime +"', '"+ body.placement +"', '"+ body.datePlayed +"', '"+ body.isObsolete +"', '"+ body.runDescription +"')");
        database.query(mySQLString)

        res.redirect('..');
    })

    // Post to ModeratorFor Table
    .post('/api/moderatorfor', async(req, res) => {
        const body = req.body;

        //await db.query(`            
        const mySQLString = ("INSERT INTO moderatorfor (gameId, userId) VALUES ('"+ body.gameId +"', '"+ body.userId +"')");
        database.query(mySQLString)

        res.redirect('..');
    })

    // Post to PlayedBy Table
    .post('/api/playedby', async(req, res) => {
        const body = req.body;

        //await db.query(`            
        const mySQLString = ("INSERT INTO playedby (runId, gameId, categoryId, userId) VALUES ('"+ body.runId +"', '"+ body.gameId +"', '"+ body.categoryId +"', '"+ body.userId +"')");
        database.query(mySQLString)

        res.redirect('..');
    })

    .listen(port, () => console.log(`Server Started on port ${port}`));
