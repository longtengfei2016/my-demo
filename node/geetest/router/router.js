var router = require('express').Router();
var Geetest = require('gt3-sdk');
var captcha = new Geetest({
    geetest_id: 'e1d7c44915b2f3cac0696f0b6e2a6388',
    geetest_key: '8e905ebcacc8ff761cbc746b8bc48f26'
});
router.use(function(req, res, next){
    console.log('router intercept')
    const m = new Date();
    const dateString = `${m.getFullYear()}/${m.getMonth() +
        1}/${m.getDate()}  ${m.getHours()}:${m.getMinutes()}:${m.getSeconds()}`;
    console.log('Time: ', dateString);
    next();
});
router.post('/login',function(req, res){
    captcha.register(null, function (err, data) {
        if (err) {
            console.error(err);
            return;
        }
        if (!data.success) {
            // req.session.fallback = true;
            res.send(data);
        } else {
            // req.session.fallback = false;
            // res.send(data);
            res.json({
                result: 'success',
                data: data
            })
        }
    });
});
module.exports = router;