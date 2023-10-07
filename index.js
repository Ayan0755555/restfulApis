const express=require("express");
const app=express();
const port=8080;
const path=require("path");
var methodOverride = require('method-override');

app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_Method'));

//inn dono se folder connect ke liye public and views//
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"))
app.use(express.static(path.join(__dirname,"public")));

let posts=[
    {
        id:"bHGVSAGAGGJgjb",
        username:"apnacollege",
        content:"I love coding"
    },
    {
        id:"ashgyavygs",
        username:"alia",
        content:"Hard work is important acchieve success"
    },
    {
        id:"2sagjhbavvhhas",
        username:"rahulkumar",
        content:"I got selected for scholorship"
    },
]

app.get("/posts",(req,res)=>{
res.render("index.ejs",{posts});
});

app.get("/posts/new",(req,res)=>{
    res.render("new.ejs")
});

app.post("/posts",(req,res)=>{
    let{username, content}=req.body;
    posts.push({username,content})
    res.redirect("/posts")
});

app.get("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=> id === p.id)
    res.render("show.ejs",{post});
});

app.patch("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let newContent=req.body.content;
    let post=posts.find((p)=> id === p.id);
    post.content= newContent;
    console.log(post);
    req.redirect("/posts")
});

app.get("/posts/:id/edit",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=> id === p.id)
    res.render("edit.ejs",{post});
});

app.listen(port,()=>{
    console.log(`listening the port : ${port}`)
})