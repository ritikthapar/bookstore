var bodyParser = require('body-parser');
var mysql = require('mysql');
var dialog=require('dialog');
var express=require('express');
 //connection to mysql

var con = mysql.createConnection({
	
	host:"localhost",
	user:"root",
	password:"",
	database:"book"
});
con.connect(function(err){
	
	if(err) throw err;
	console.log("Connected");
});

module.exports = function(app){	
    app.use(express.json());
    app.use(express.urlencoded({extended:false}));
    app.get("/",function(req,res){
        res.render("login")
    })
   
    app.get("/login",function(req,res){
        res.render("login")
    })
    app.post("/login",(req,res)=>{
        con.query("select id from login where username=? and pass=?",[req.body.username,req.body.password],(err,result)=>{
            if(err) throw err;
            if(result.length!=0) res.redirect("/home");
            else{
                 dialog.info("Sorry");
                 res.redirect("/login");
                }
        })
    })
    app.get("/register",function(req,res){
        res.render("register")
    })
    app.post("/register",(req,res)=>{
        if(req.body.password == req.body.cpassword){
            con.query("insert into login (username,pass) value(?,?)",[req.body.username,req.body.password],(err,result)=>{
                if(err) throw err;
                dialog.info("Welcome to the Store");
                res.redirect("/login");
            })
        }
        else{
            dialog.info("Wrong values");
        }
    })
    app.get("/home",function(req,res){
        res.render("home")
    })
    app.get("/contact",function(req,res){
        res.render("contact")
    })
    app.post("/contact",(req,res)=>{
        con.query("insert into query (username,phone,uquery) value(?,?,?)",[req.body.username,req.body.phone,req.body.query],(err,result)=>{
            if(err) throw err;
            dialog.info("Query Submitted");
            res.redirect("/contact");
        })
    })

};