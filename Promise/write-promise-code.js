/**
 * Created by PC on 2016/5/2.
 */
function getURL(URL) {
    return new Promise(function (resolve, reject) {
        var req = new XMLHttpRequest();
        req.open('GET', URL, true);
        req.onload = function() {

            //XHR获得状态200时才调用resolve，其他情况调用reject
            if (req.status === 200) {
                resolve(req.statusText);  //resolve方法的参数没有特别的规则，基本上把要传给回调函数的参数放进去就可以了。
            } else {
                reject(new Error(req.statusText));  //传给reject的参数也没有什么特殊的限制，一般只要是Error对象就可以了。
            }
        };
        req.onerror = function() {
            reject(new Error(req.statusText));
        };
        req.send();
    });
}

var URL = "http://httpbin.org/get";
getURL(URL).then(function onFulfilled(value){
    console.log(value);
}).catch(function onRejected(error){
    console.log(error);
});
