//set up
var express = require('express')
var app = express();
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser');

//If a client asks for a file,
//look in the public folder. If it's there, give it to them.
app.use(express.static(__dirname + '/public'));

//this lets us read POST data
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
var bodyParser = require('body-parser');
app.use(cookieParser())

//make an empty list of ideas
var coolIdeas = [];

var addIdea  = function (message,author) {
  var idea = {};
  idea.text = message;
  idea.author = author;
  idea.time = new Date();
  coolIdeas.push(idea);
  if (author === undefined){
    idea.author = "anonymous"
  }
}

addIdea("try wearing a hat on cold days","matthew");

//let a client GET the list of ideas
app.get('/ideas', function (req, res) {
  console.log("this user looked at the posts: " + req.cookies.name);
  res.send(coolIdeas);
});

//let a client POST new ideas
app.post('/ideas', function (req, res) {
  console.log(req.body.idea); //write it on the command prompt so we can see
  addIdea(req.body.idea,req.cookies.name);
  res.send("thanks for your idea");
});

app.post('/Login', function (req, res) {
  console.log(req.body);
  var userName = req.body.username;
  res.cookie('name', userName, { maxAge: 900000, httpOnly: true });
  res.send("setting your name");
  console.log(userName);
  console.log("this user looked at the posts: " + req.cookies.name); //write it on the command prompt so we can see
});

//listen for connections on port 3000
app.listen(process.env.PORT || 3000);
console.log("I am listening...");
