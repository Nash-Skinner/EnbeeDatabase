import express from 'express';
import config from './config.json' assert { type: "json" };
import { initializeDatabase } from './initializeDatabase.js';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import mysql from 'mysql';

const db = initializeDatabase(config);
const database = mysql.createConnection({host: config.host, user: config.user, password: config.password, database: config.database});
const app = express()
const port = process.env.PORT || 3000;

app
    .use(morgan('dev'))
    .use(express.static('public'))
    .use(bodyParser.urlencoded({extended: true}))
    .use(bodyParser.json())

    .get('/api/game', async(req,res) => {
        var sql = "SELECT * FROM game ORDER BY gameId";
        database.query(sql, (err, result)=>{
            console.log(result)
        })
    })

    .post('/api/game', async(req, res) => {
        const body = req.body;

        //await db.query(`            
        const mySQLString = ("INSERT INTO game (gameId, abbrev, name, platforms, releaseYear, weblink) VALUES ('"+ body.gameId +"', '"+ body.abbrev +"', '"+ body.name +"', '"+ body.platforms +"', '"+ body.releaseYear +"', '"+ body.weblink +"')");
        database.query(mySQLString)

        res.json(req.body);
    })

    .listen(port, () => console.log(`Server Started on port ${port}`));
