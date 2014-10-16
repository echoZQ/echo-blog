---
layout: post
title: javascript高阶函数
category: 技术
tags: Javascript
description: 进阶之路
---
## 函数
函数本身就是特殊对象，一切都可以传入function的值，连function本身也不例外。

	//示例
	//Array对象的sort方法，需传入一比较函数
	var myarray = [2,5,7,3];
	var byAsc = function(x,y) { return x-y; };
	var byDesc = function(x,y){ return y-x; };
	myarray.sort(byDesc);
	alert(myarray);    //7,5,3,2
	myarray.sort(byAsc);
	alert(myarray);    //2,3,5,7
	
甚至于我们根本不需要定义一个对外公开的Function（因为其他地方不会使用到），直接用一个匿名函数：

	//对一个日期数组排序 function本身就是参数
	dateArr.sort(function (x,y) {
    	return x.date – y.date;
	});
## 高阶函数
高阶函数是函数式编程的显著特征，是**对函数的进一步抽象**。高阶函数至少满足下列条件之一：

1. 接受函数作为输入。

2. 输出一个函数。

## 闭包
闭包的最大特性就是**不需要通过传递变量的方式就可以从内层直接访问外层的环境**，这为多重嵌套下的函数式程序带来了极大的便利性。  

	//实现一个计数器
	function counter(){
    	var n = 0;
    	return function(){ return ++n; }
	}
	//创建一个计数器
	var count1 = counter();
	count1();  //1
	count1();  //2
	count1();  //3
	//再创建一个
	var count2 = counter();
	count2();  //1
	count2();  //2
	
### 什么是闭包
闭包是指程序中的代码块允许一级函数存在（function1）并且在一级函数中所定义的自由变量(x、y)能**不被释放**，直到一级函数被释放前，一级函数外也能应用这些未释放的自由变量

### 运行期上下文
每一个JS 函数都表示为一个对象，该对象有一个内部属性[[Scope]]，它包含了一个函数被创建的作用域中对象的集合，这个集合被称为函数的作用域链(Scope chain)，它决定哪些数据能被函数访问。函数作用域中的每个对象被称为一个可变对象(variable object)。

		function add(num1, num2) {
	    	var sum = num1 + num2;
	    	return sum;
	    }
而**执行此函数时**则会创建一个称为"运行期上下文(execution context)"的内部对象，它定义了函数执行时的环境。**函数每次执行时对应的运行期上下文都是独一无二的**，所以**多次调用同一个函数就会导致创建多个运行期上下文**。**当函数执行完毕，执行上下文就被销毁。**

### 运行期上下文与作用域链
每个运行期上下文都有**自己的作用域链**，用于标识符解析，而它的作用域链引用的则是函数的内部对象[[Scope]]所指向的作用域链。此外还会创建一个"活动对象(Activation object)"，该对象包含了函数的所有局部变量、命名参数、参数集合以及this，当函数**执行时**它又被当作可变对象。然后此对象会**被推入作用域链的前端**，就这样运行期上下文也就创建好了，当运行期上下文被销毁，活动对象也随之销毁(闭包除外)。

### 闭包原理

	var test=function(y){    //function1
    	var x=y;// 这个是局部变量
    	return function(){  //function2
     	alert(x++);// 就是这里调用了闭包特性中的
     	//一级函数局部变量的x，并对它进行操作
     	alert(y--);// 引用的参数变量也是自由变量
    	}}(5);// 后面这个(5)，让前面的函数运行了，abc被初始化为function2
 
	test();// "5" "5" function1之外（function2），能够继续调用x、y
	test();// "6" "4"
	test();// "7" "3"
当匿名函数function1被执行的时候，将创建一个“闭包（Closure）”，也就是function2。为了让这个“闭包”能够访问function1的变量，必须创建一个**特定的作用域链**：因为**“闭包”的[[Scope]]属性包含了与“运行期上下文”相同的对象引用**，当一级函数运行完毕之后，它的**“活动对象”**的引用依旧存在于“闭包”的[[Scope]]属性中，所以**一级函数的“活动对象”无法被销毁**（即一级函数运行完毕后，闭包函数依旧能够范围一级函数内的变量）。

来来来，换一种解释就是: 即使离开函数作用域的情况下仍然能够通过引用调用内部函数的事实，意味着**只要存在调用内部函数的可能，JavaScript就需要保留被引用的函数**。而且JavaScript运行时需要跟踪引用这个内部函数的所有变量，**直到最后一个变量废弃，JavaScript的垃圾收集器才能释放相应的内存空间**。

### 经典错误
	
	<div id="divTest">
        <span>0</span> <span>1</span> <span>2</span> <span>3</span>
    </div>
    <div id="divTest2">
        <span>0</span> <span>1</span> <span>2</span> <span>3</span>
    </div>
    
    //wrong
    var spans = $("#divTest span");
    for (var i = 0; i < spans.length; i++) {
        spans[i].onclick = function() {
            alert(i); //每次都出来4
        }
    }
    
上面代码在页面加载后就会执行，当i的值为4的时候，判断条件不成立，for循环执行完毕，但是因为**每个span的onclick方法这时候为内部函数**，所以i被闭包引用，内存不能被销毁，i的值会一直保持4，直到程序改变它或者所有的onclick函数销毁（主动把函数赋为null或者页面卸载）时才会被回收。这样每次我们点击span的时候，onclick函数会查找i的值（作用域链是引用方式），一查等于4，然后就alert给我们了。

    //right
    var spans2 = $("#divTest2 span");
    for (var i = 0; i < spans2.length; i++) {
        (function(num) {
             spans2[i].onclick = function() {
                 alert(num);
             }
         })(i);
     }
     
而第二种方式是使用了一个立即执行的函数又创建了一层闭包，函数声明放在括号内就变成了表达式，后面再加上括号括号就是调用了，这时候把i当参数传入，**函数立即执行**，num保存每次i的值。


### 活动对象
	var a=100;
	(function(){
    	console.log(a); //undefined 遍历“作用域链”寻找变量的时候，先遇到了“活动对象”中的a，此时它尚未被赋值，故为undefined。
    	var a=1;
	})()

## 函数柯里化(!!!)
### 柯里化
	//维基百科有个例子
	var foo = function(a) {
  		return function(b) {
    		return a * a + b * b;
  		}
	}
	
	//函数调用
	(foo(3))(4)，或直接 foo(3)(4)
	
### 一个Ajax页面局部刷新的例子
 
	//替换DOM中某个节点的html
	function update(id){
    	return function (data){
        	$("div#"+id).html(data.text);
    	}
	}
 
	//Ajax局部刷新
	function refresh(url, callback){
    	$.ajax({
       		type:"get",
     	url:url,
        	dataType:"json",
     	success:  function (data){
            callback(data);
    	});
	}
 
	//刷新两个区域
	refresh("friends.php", update("friendsDiv"));
	refresh("newfeeds.php", update("feedsDiv"));
上面的update函数的原型本来应该是update(id, data)，接收两个参数。柯里化之后则先接收id，确定刷新区域是哪里，返回接收余下参数的一个函数作为refresh函数的callback，等到ajax返回data结果之后，在传入callback，更新页面。或许有人会问，为何不直接把refresh设计成refresh(id, url)？这是因为update的方法可能有很多，可能还有update1，update2这样一系列方法，对返回结果的处理都不同，通过这种“柯里化”的方式可以使得refresh得到更高阶的抽象，更好的重用。


## 参考链接
感谢作者
[访问](http://rolfzhang.com/articles/793.html)
[访问](http://www.cnblogs.com/xiaoyang002/p/4012639.html)

