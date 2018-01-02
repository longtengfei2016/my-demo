var $apis = {
    get: function(url, successFn, errorFn){
        $.ajax({
            url: url,
            type: 'GET',
            contentType: 'application/json',
            success: function(res){
                successFn();
            },
            error: function(res){
                errorFn(res);
            }
        })
    },
    post: function(url, data, successFn, errorFn){
        $.ajax({
            url: url,
            type: 'POST',
            data: data,
            contentType: 'application/json',
            success: function(res){
                successFn && successFn(res);
            },
            error: function(res){
                errorFn && errorFn(res);
            }
        })
    }
};
var geetest = $('#geetest');
var initData = {
    gt: '',
    challenge: '',
    offline: 0,
    new_captcha: false
};
function login(name, password){
    $apis.post('/login', {name: name, password: password}, function(r){
        if(r.result==='success'){
            console.log('login success')
            console.log(r.data)
            initData.gt = r.data.gt;
            initData.challenge = r.data.challenge;
            initData.offline = !r.data.success;
            initData.new_captcha = r.data.new_captcha;
            init(initData);
        }
    })    
}
function init(data){
    initGeetest(data, function (captchaObj) {
        console.log('init success')
        captchaObj.appendTo(geetest);
    })
}