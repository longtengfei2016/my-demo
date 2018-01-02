var http = require('http');
var express = require('express');
var path = require('path');
var app = express();
var Geetest = require('gt3-sdk');
var apiRouter = require('./router/router');
var mysqlServer = require('mysql');
var captcha = new Geetest({
    geetest_id: 'e1d7c44915b2f3cac0696f0b6e2a6388',
    geetest_key: '8e905ebcacc8ff761cbc746b8bc48f26'
});
var publicPath = path.join(__dirname, 'public');
app.use(express.static(publicPath));
app.use(apiRouter);
app.get('/', function(req, res){
    res.sendFile(publicPath + '/index.html')
})
http.Server(app).listen(8888, function(){
    console.log('running')
})