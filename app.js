import express from 'express';
import config from './config.json';
import { initializeDatabase } from './initializeDatabase.js';

const db = initializeDatabase(config);
const app = express()

// Landing page
app.get("/", (req, res) => {
    res.send('Hello World') 
});

// Post Table
app.get("/posttable",(req, res) => {
    let sql = "Select * from Game";
    db.query(sql, err => {
        if(err) {
            throw err;
        }
        res.send("Post Table Created");
    }) 
});

app.listen("3000", () => {
    console.log("Server Started on port 3000")
})