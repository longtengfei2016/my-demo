// 数组去重
function distinctArray1(array){
    var result = [];
    array.forEach(function(item, index, array) {
        if (array.indexOf(item) === index) {
            result.push(item);
        }
    });
    return result;
}
function distinctArray2(array){
    return [...new Set(array)];
}
//jquery ajax
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
    },
    put: function(url, data, successFn, errorFn){
        $.ajax({
            url: url,
            type: 'PUT',
            data: data,
            contentType: 'application/json',
            success: function(res){
                successFn && successFn(res);
            },
            error: function(res){
                errorFn && errorFn(res);
            }
        })
    },
    'delete': function(url, data, successFn, errorFn){
        $.ajax({
            url: url,
            type: 'DELETE',
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