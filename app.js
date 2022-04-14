const express = require('express')
const mysql = require('mysql')
const host = 'localhost';
const user = 'root';
const password = '';
const database = 'EnbeeDatabase';

const Importer = require('mysql-import');
const importer = new Importer({host, user, password});

// Create connection
const db = mysql.createConnection({
    host: host,
    user: user,
    password: password
});

// Connect to MySql
db.connect(err => {
    if(err){
        throw err
    }
    console.log("MySQL Connected")
});

// Imports SQL Schema
importer.import('./EnbeeSchema.sql').then(()=>{
    var files_imported = importer.getImported();
    console.log(`${files_imported.length} SQL file(s) imported.`);
}).catch(err=>{
    console.log("DataBase Already Initialized")
});

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