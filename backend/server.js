const express = require("express");
const cors = require("cors")
const mysql = require("mysql2")
const PORT = 8080

const app = express()
app.use(cors())

const db = mysql.createConnection({
    host: "localhost",
    user: "user-name",
    password: "user-pas",
    database: "db-name"
});

db.connect((err) => {
    if (err) {
      console.error('Error connecting to the database:', err);
      return;
    }
    console.log('Connected to the database');
});

app.get("/api/users", (req, res) => {
    const query = "SELECT * FROM users;";
    db.query(query, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    })
});

app.listen(PORT, ()=> {
    console.log(`server listening at port: ${PORT}`)
});