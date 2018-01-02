var http = require('http');
var express = require('express');
var app = express();
var Geetest = require('gt3-sdk');
var apiRouter = require('./router/router');
var mysqlServer = require('mysql');
var captcha = new Geetest({
    geetest_id: 'e1d7c44915b2f3cac0696f0b6e2a6388',
    geetest_key: '8e905ebcacc8ff761cbc746b8bc48f26'
});

app.use(apiRouter);
http.Server(app).listen(8888, function(){
    console.log('running')
})