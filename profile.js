var express = require('express');
var fs = require('fs');
var logger = require('morgan');
var _ = require('lodash');
var profile = express.Router();
var users = [];

fs.readFile('users.json', {'encoding':'utf8'},function(err,data) {
    if(err) throw err;
    //The JSON.parse() method parses a string and returns a JavaScript object
    JSON.parse(data).forEach(function(user) {
        user.fullName = _.startCase(user.fname + ' ' + user.lname);
        users.push(user);
    })
})

profile.use(function(req,res,next){
    console.log('middle ware function invoked');
    next();
});

profile.use(express.static('public/images'));

profile.get('/', function(req,res) {
    var buffer = '';
    users.forEach(function(user) {
        buffer += '<a href="/profile/'+ user.username + '">' + user.fullName + '</a><br>'; 
    })
    res.send(buffer); 
})

profile.get('/:username', function(req,res) {
    //:username tells express that whatever is after : is a request param 
    var result = users.filter(user => req.params.username === user.username)
    res.send(JSON.stringify(result));
})

module.exports = profile;

