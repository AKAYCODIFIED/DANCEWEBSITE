const express = require("express");
const path = require("path");
const app = express();
const fs=require("fs");
const bodyparser=require("body-parser");

// body-parser is a middleware module for Express.js, which is a popular web framework for Node.js. The primary purpose of body-parser is to parse the body of incoming HTTP requests. When a client (e.g., a web browser or a mobile app) sends data to a server, the data is often included in the body of the HTTP request. body-parser helps in extracting this data and making it available in a format that is easy to work with in your Express.js routes.


// connecting to database 
const mongoose = require('mongoose');
main().catch(err => console.log(err));
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/contactdance');
}
const port = 8000;

// define mongoose schema 
const contactschema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
});

const contact = mongoose.model('contact', contactschema);

app.use('/static', express.static('static'));
app.use(express.urlencoded());

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));


const params={}
app.get("/", (req, res) =>{
    res.status(200).render('home.pug',params);
    
});

app.get("/contact", (req, res) =>{
    res.status(200).render('contact.pug',params);
    
});
app.post("/contact", (req, res) =>{
    var mydata=new contact(req.body);
    // var mydata = new contact(req.body);: It creates a new instance of a model called contact using the request body (req.body)
    mydata.save().then(()=>{
        res.send("data has been saved to the database");
    }).catch(()=>{
        res.status(400).send("data has not been saved to database");
    })
    
});

app.listen(port, () => {
    console.log(`server is listening at port ${port}`);
});