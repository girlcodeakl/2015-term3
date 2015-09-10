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

var addIdea  = function (message, image) {
  var idea = {};
  idea.text = message;
  idea.time = new Date();
  idea.imageurl = image;
  coolIdeas.push(idea);
}

addIdea("try wearing a hat on cold days", "hgfjf.jpg");

//let a client GET the list of ideas
app.get('/ideas', function (req, res) {
  console.log("this user looked at the posts: " + req.cookies.name);
  res.send(coolIdeas);
});

//let a client POST new ideas
app.post('/ideas', function (req, res) {
  console.log(req.body.idea); //write it on the command prompt so we can see
  addIdea(req.body.idea, req.body.image);
  res.send("thanks for your idea");
});

app.post('/Login', function (req, res) {
  console.log(req.body);
  var userName = req.body.username;
  res.cookie('name', userName, { maxAge: 900000, httpOnly: true });
  console.log(userName); //write it on the command prompt so we can see
});

//listen for connections on port 3000
app.listen(3000);
console.log("I am listening...");
