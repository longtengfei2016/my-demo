var http = require('http');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();
var apiRouter = require('./router/router');
// var mysqlServer = require('mysql');
var publicPath = path.join(__dirname, 'public');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(publicPath));
app.use(apiRouter);
app.get('/', function(req, res){
    res.sendFile(publicPath + '/index.html')
})
http.Server(app).listen(8888, function(){
    console.log('running')
})