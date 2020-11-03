var express = require("express");
var app = express();
var mysql = require("mysql");
let cors = require("cors");
app.use(cors());
let bodyParser = require("body-parser");
app.use(bodyParser());
// Connect create with Mysql
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "mohit555",
  database: "mydbase",
});
// database connected confirmation
con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

app.use(bodyParser.urlencoded({ extended: true }));
//Add record using post
app.post("/add", (req, res) => {
  let Name = req.body.name;
  let Age = req.body.age;
  var sql = "INSERT INTO person (name,age) VALUES (?, ?)";

  con.query(sql, [Name, Age], function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");

    sql = "select count from counter where operation='add'";
    con.query(sql, (err3, rows) => {
      if (!err3) {
        temp = rows[0].count + 1;
        sql = "update counter set count=" + temp + " where operation='add'";

        con.query(sql, (err2, rows2) => {
          if (!err2) {
            res.send("recoard add successfully");
          } else console.log(err2);
        });
        // console.log(temp)
      } else console.log(err3);
    });
  });
});

//update Table
app.put("/update", (req, res) => {
  let Name = req.body.name;
  let Age = req.body.age;
  var sql =
    'update person set name="' +
    Name +
    '", age=' +
    Age +
    ' where name="aman" ';
  console.log(sql);
  con.query(sql, function (err, result) {
    if (!err) {
      sql = "select count from counter where operation='update'";
      con.query(sql, (err3, rows) => {
        if (!err3) {
          temp = rows[0].count + 1;
          sql = "update counter set count=" + temp + " where operation='update'";

          con.query(sql, (err2, rows2) => {
            if (!err2) {
              res.send("recoard updated successfully");
            } else console.log(err2);
          });
          // console.log(temp)
        } else console.log(err3);
      });
    } else console.log(err);
  });

  // con.query("select adder from count")
});
app.get("/count", (req, res) => {
  var sql = "select * from counter";
  con.query(sql, (err, rows) => {
    if (!err) {
      temp = rows;
      console.log(temp[0].count);
      res.send(rows);
    } else console.log(err);
  });
});
app.get("/updatecount", (req, res) => {
    var sql = "select count from counter where operation='update'";
    con.query(sql, (err, rows) => {
      if (!err) {
        temp = rows;
        console.log(temp[0].count);
        res.send(rows);
      } else console.log(err);
    });
  });
app.get("/pp", (req, res) => {
  var sql2 = "update counter set count=5 where operation='add'";
  con.query(sql2, (err2, rows2) => {
    if (!err2) {
      console.log("string");
    } else console.log(err2);
  });
});

app.get("/cc", (req, res) => {
  var sql = "select count from counter where operation='add'";
  con.query(sql, (err3, rows) => {
    if (!err3) {
      temp = rows[0].count + 1;
      var sql2 = "update counter set count=" + temp + " where operation='add'";

      con.query(sql2, (err2, rows2) => {
        if (!err2) {
          console.log("string");
          res.send("chal");
        } else console.log(err2);
      });
      // console.log(temp)
    } else console.log(err3);
  });
});

//fetching data
app.get("/try", (res, req) => {
  con.query("select * from person", (err, rows, fields) => {
    if (!err) {
      console.log(rows);
      res.send(rows);
    } else console.log(err);
  });
});

app.listen("8080", () => {
  console.log("running");
});
