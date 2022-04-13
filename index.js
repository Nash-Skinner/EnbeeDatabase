const express = require('express')
const mysql = require('mysql')

// Create connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "EnbeeDatabase",
});

// Connect to MySql
db.connect(err => {
    if(err){
        throw err
    }
    console.log("MySQL Connected") 
});

const app = express()

// Create Database
app.get("/", (req, res) => {
    res.send('Hello World') 
});

// Create Database
app.get("/createdb", (req, res) => {
    let sql = "CREATE DATABASE EnbeeDatabase";
    db.query(sql, (err) => {
        if(err) {
            throw err;
        }
        res.send("Database Created");
    }); 
});

// Create Table
app.get("/createposttable",(req, res) => {
    let sql = "CREATE TABLE Game( Abbrev varchar(10), Name varchar(10), Rules varchar(10), Platform varchar(10), ReleaseYear date, PRIMARY KEY (Abbrev))";
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