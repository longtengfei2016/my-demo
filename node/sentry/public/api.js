var $apis = {
    get: function(url, successFn, errorFn){
        $.ajax({
            url: url,
            type: 'GET',
            contentType: 'application/json',
            success: function(res){
                successFn && successFn(res);
            },
            error: function(res){
                errorFn && errorFn(res);
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
function getProject(){
    $apis.get('/projects', function(r){
        if(r.result==='success'){
            console.log(r.data)
        }
    })    
}