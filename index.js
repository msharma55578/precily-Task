var express = require('express');
var app = express();
var mysql = require('mysql');
let cors=require('cors');
app.use(cors())
let bodyParser=require('body-parser');
app.use(bodyParser())
// Connect create with Mysql
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "mohit555",
    database: "mydbase"
  });
// database connected confirmation
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });
  
app.use(bodyParser.urlencoded({extended:true}))
//Add record using post 
app.post("/add",(req,res)=>{
    let Name=req.body.name
    let Age=req.body.age
    var sql="INSERT INTO try_table (name,age) VALUES (?, ?)";

    con.query(sql,[Name,Age], function (err, result) {
    if (err) throw err;
      console.log("1 record inserted");
    });
  })

//update Table
app.put("/update",(req,res)=>{
    con.query('update try_table set name="change", age="18" where name="chander" ',(err,rows,fields)=>{
        if(!err)
            console.log(rows);
        else
        console.log(err);
    })
})
//fetching data
app.get("/try",(res,req)=>{
    con.query('select * from try_table',(err,rows,fields)=>{
        if(!err){
            console.log(rows);
             req.send(rows)
        }
        else
            console.log(err);
    })
})

app.listen('8080',() =>{
    console.log('running');
})