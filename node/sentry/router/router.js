var router = require('express').Router()
var request = require('../utils/request')

router.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Authentication,Origin, X-Requested-With, Content-Type, Accept,token");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    if(req.method == 'OPTIONS') {
        //让options请求快速返回
        res.sendStatus(200);
    } else {
        next(); 
    }
});
router.use(function(req, res, next){
    console.log('router intercept')
    const m = new Date();
    const dateString = `${m.getFullYear()}/${m.getMonth() +
        1}/${m.getDate()}  ${m.getHours()}:${m.getMinutes()}:${m.getSeconds()}`;
    console.log('Time: ', dateString);
    next();
})
router.get('/projects',function(req, res){
    request('/api/0/projects/', {}, (error, response, body) => {
        if (error) {
            console.error(error);
            return;
        }
        if (!error && response.statusCode !== 200) {
            res.send(body);
        } else {
            res.json({
                result: 'success',
                data: JSON.parse(body)
            })
        }
    })
});
module.exports = router;