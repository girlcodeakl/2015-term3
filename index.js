//set up
var express = require('express')
var app = express();
var bodyParser = require('body-parser')

//If a client asks for a file,
//look in the public folder. If it's there, give it to them.
app.use(express.static(__dirname + '/public'));

//this lets us read POST data
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//make an empty list of ideas
var coolIdeas = [];
var idea = {};
idea.text = "try wearing a hat on cold days";
coolIdeas.push(idea);

idea.time = new Date();

//let a client GET the list of ideas
app.get('/ideas', function (req, res) {
  res.send(coolIdeas);
});

var user = [];

//let a client POST new ideas
app.post('/ideas', function (req, res) {
  console.log(req.body.idea); //write it on the command prompt so we can see
  coolIdeas.push(req.body.idea); //save a new idea
  res.send("thanks for your idea");
});

app.post('/user', function (req, res) {
  console.log(req.body.user); //write it on the command prompt so we can see
  user.push(req.body.user); //save a new idea
  res.send("you are now a user");
});

//listen for connections on port 3000
app.listen(3000);
console.log("I am listening...");
