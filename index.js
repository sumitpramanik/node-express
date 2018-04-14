var express = require('express');
var fs = require('fs');
var _ = require('lodash');
var app = express();
var users = [];

fs.readFile('users.json', {'encoding':'utf8'},function(err,data) {
    if(err) throw err;
    //The JSON.parse() method parses a string and returns a JavaScript object
    JSON.parse(data).forEach(function(user) {
        user.fullName = _.startCase(user.fname + ' ' + user.lname);
        console.log(user.fullName);
        users.push(user);
    })
})

app.get('/', function(req,res) {
    var buffer = '';
    users.forEach(function(user) {
        buffer += user.fullName + '<br>';   
    })
    res.send(buffer); 
})

const server = app.listen(3000, ()=> {
    console.log('Server started on http://localhost:' + server.address().port);
})