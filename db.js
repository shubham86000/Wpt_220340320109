//CODE OF Java script TO ADD AND VIEW ALL


let dbpara={
 
    host: "localhost",

    user: "root",
password: "cdac",

database: "pleasework",
port:3306};
const mysql = require("mysql2");
const connection = mysql.createConnection(dbpara);

const express = require("express");
const app =express();

app.use(express.static("cp"));

app.get("/findme",(req,resp)=>{
    let input = req.query.pqr;
    console.log(input);
 
    let data = {status:false,bookdetails:{}};
    connection.query("select * from book where bookid=?",[input],(err,res1)=>{
        if(res1.length > 0)
        {
            data.status=true;
            data.bookdetails=res1[0];
        }
        resp.send(data);
    });
});

app.get("/Add",(req,resp)=>{
    let bookid = req.query.a;
    let bookname = req.query.b;
    
    let price = req.query.c;
   
    let data = {status:false,bookdetails:{}};
    connection.query("insert into book (bookid,bookname,price) values(?,?,?)",[bookid,bookname,price],(err,res1)=>{
        if(res1.affectedRows > 0)
        {
            data.status=true;
            
        }
        resp.send(data);
    });
});

app.get("/showall",(req,resp)=>{
    
   
   
    let data = "";
    connection.query("select * from book",[],(err,res1)=>{
      
        resp.send(res1);
    });
});

app.listen(900,function(){
    console.log("server listenig at port 900...");
})