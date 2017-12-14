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