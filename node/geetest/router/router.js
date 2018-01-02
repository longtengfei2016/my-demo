var router = require('express').Router();
router.use(function(req, res, next){
    console.log('router intercept')
    const m = new Date();
    const dateString = `${m.getFullYear()}/${m.getMonth() +
        1}/${m.getDate()}  ${m.getHours()}:${m.getMinutes()}:${m.getSeconds()}`;
    console.log('Time: ', dateString);
    next();
});
router.post('/login',function(req, res){
    console.log('login')
    res.json({
        result: 'success'
    })
});
module.exports = router;