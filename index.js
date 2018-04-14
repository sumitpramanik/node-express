var express = require('express');
var profile = require('./profile.js');
var app = express();

app.use('/profile', profile)

const server = app.listen(3000, ()=> {
    console.log('Server started on http://localhost:' + server.address().port);
})

module.exports = express;