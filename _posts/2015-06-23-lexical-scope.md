---
layout: post
title: 关于词法作用域
category: 技术
tags: Javascript
description: 看javascript语言精粹
---

### 缘由
javascript中的函数**在定义它们的作用域里运行，而不是在执行它们的作用域里运行**
查了查词法作用域，知乎上有一问有助理解[访问](http://www.zhihu.com/question/20032419)

	var foo=1;
	function static(){
		alert(foo);
	}
	!function(){
		var foo=2;
		static(); //结果为1
	}();
	
1. 词法作用域等同于静态作用域（eval和with可以构成动态作用域）
2. strict模式下完全是静态作用域（声明的作用域是根据程序正文在编译时就确定的），用with就会报错
3. 感叹号是将后续的函数作为可以直接执行的函数表达式， 还能用new function(){...} 这样还能省去最后的一对括号。
4. !function(){}() 返回的是true，就算!function(){return false;}() 返回的也是true。而new function(){return false;}返回的始终是Object {}

下面看点不同

	var foo=1;
	function static(){
		alert(foo);
	}
	!function(){
		foo=2;
		static(); //结果为2
	}();

### 上下文
	var myAlerts = [];

	for (var i = 0; i < 5; i++) {
    	myAlerts.push(
        	function inner() {
            	alert(i);
        	}
    	);
	}

	myAlerts[0](); // 5
	myAlerts[1](); // 5
	myAlerts[2](); // 5
	myAlerts[3](); // 5
	myAlerts[4](); // 5

inner()方法是一个全局的方法，所以它的作用域链是静态的绑定在全局上下文中的。inner函数解析的i，是在全局的上下文中，在每次解析时已经加到了5
[访问](http://davidshariff.com/blog/javascript-scope-chain-and-closures/)
		
	