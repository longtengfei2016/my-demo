var  Buffer = require ('buffer');

var http = require('http');
var server = http.createServer(function(req, res){
    res.writeHeader(200, {'content-type': 'text/html;charset="utf-8"'});
    res.write('启动成功！');
    res.on('data', function(chunk) {
        console.log(Buffer.isBuffer(chunk) + '\n')
        console.log(typeof chunk)
    });
    res.on('end', function() {
        console.log('server end!')
    });
    res.end();
}).listen(8888);
