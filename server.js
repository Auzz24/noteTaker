const express = require('express');
const fs = require('fs')
const path = require('path');

const db = require("./db/db.json");

const app = express();


const PORT = process.env.PORT || 3001; 

// middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true})); 
app.use(express.static('public'));

// app.use(htmlRoutes);
// app.use('/api' , apiRoutes);


app.get("/notes", (req, res) => {

    res.sendFile(path.join(__dirname, "./public/notes.html"))
})

app.get("/api/notes", (req, res) => {

    res.json(db)

})

app.post("/api/notes", (req, res) => {
    console.log(req.body)
    db.push(req.body)
    console.log(db)
    fs.writeFile(path.join(__dirname, "./db/db.json"), JSON.stringify(db), () => {
        res.json(req.body)
    })
    
})


app.get("*", (req, res) => {

    // res.send("Hello there!")
    res.sendFile(path.join(__dirname, "./public/index.html"))
})

app.listen (PORT, () => {
    console.log("app running on port" + PORT);
});

