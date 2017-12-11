var  Buffer = require ('buffer');

var http = require('http');
http.createServer(function(req, res){
    res.writeHeader(200, {'content-type': 'text/plain'});
    res.on('data', function(chunk) {
        console.log(Buffer.isBuffer(chunk) + '\n')
        console.log(typeof chunk)
    })
    res.on('end', function() {
        console.log('server end!')
    })
}).listen(8888);

