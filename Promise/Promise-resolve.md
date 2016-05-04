一般情况下我们都会用`new Promise()`来创造promise对象，除此之外我们还可以用`Promise.resolve`和`Promise.reject`这两个方法。
#new Promise()的快捷方式
`Promise.resolve(value)`可以看为`new Promise()`方法的快捷方式。
比如`Promise.resolve(42)`可以看为下列代码：
```
new Promise(function(resolve) {
    resolve(42);
});
```
方法`Promise.resolve(value)`返回的是一个Promise对象，所以可以对其返回值进行`.then`调用。
```
Promise.resolve(42).then(function(value) {
    cosole.log(value);
});
```
#Thenable
先介绍一下一个概念<u>thenable</u>。这是ES6中提出的概念，简单来说就是一个类似promise的东西。

拥有`.then`方法的就是thenable对象。

最典型的例子是<u>jQuery.Ajax()</u>，它返回值是thenable的。

```
$ajax('/json/comment.json');  // => 拥有.then方法的对象
```

thenable可以用`Promise.resolve`来转换为一个promise对象。

```
var promise = Promise.resolve($ajax('/json/comment.json'));  // => 转换为promise对象
promise.then(function(value) {
    console.log(value);
});
```

简单总结`Promise.resolve`方法是讲传递给他的参数填充到promise对象并返回这个promise对象。