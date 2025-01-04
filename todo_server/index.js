const express = require('express');
const mysql = require('mysql');
const cors = require('cors');


const app = express();
app.use(cors());
app.use(express.json())

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "students"
})
// mySQL get all data from database=======================
app.get("/loadStudent", (req, res) => {
    const sql = "SELECT * FROM `info_student`";
    db.query(sql, (err, result) => {
        if(err) return res.json({message: "Data NOt loaded from Server!"});
        return res.json(result)
    })

})

// new Data added  to mysql database ===========================
app.post("/newUser", ( req, res) => {
    const sql = "INSERT INTO info_student (`name`, `roll`, `email`) VALUES (?)";
    const values = [
        req.body.name,
        req.body.roll,
        req.body.email
    ]
    db.query(sql, [values], (err, result) => {
        if(err) {
            return res.json({message: "New Student Nor Added!"})
        }
            return res.json(result)
    })
})

// get or read single Data in tha mysql data base ======================
app.get("/read/:id", (req, res) => {
    const sql = "SELECT * FROM `info_student` WHERE id = ? ";
    const id = req.params.id;
    db.query(sql, [id], (err, result) => {
        if(err) return res.json({message: "single Data read Server Error"})
            return res.json(result);
    })
})

// Update Data in the database ===================
app.put("/update/:id", (req, res) => {
    const sql = "UPDATE info_student SET `name`=?, `email`=?, `roll`=? WHERE id=? "
    const id = req.params.id;
    db.query(sql, [req.body.name, req.body.email, req.body.roll, id], (err, result) => {
        if(err) return res.json({message: ""})
            return res.json(result)
    })
})

// Delete to data from Database ===============
app.delete("/delete/:id", (req, res) => {
    const sql = "DELETE FROM info_student WHERE id = ? ";
    const id = req.params.id;
    db.query(sql, [id], (err, result) => {
        if(err) return res.json({message: ""});
        return res.json(result)
    })
})

app.listen(8080, () => {
    console.log("Listening..............");
})