var router = require('express').Router()
var request = require('../utils/request')

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