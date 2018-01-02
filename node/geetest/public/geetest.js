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
function login(name, password){
    $apis.post('/login', {name: name, password: password}, function(r){
        if(r.result==='success'){
            console.log('login success')
        }
    })    
}