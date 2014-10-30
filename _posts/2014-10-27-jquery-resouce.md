---
layout: post
title: jQuery源码阅读
category: 阅读
tags: Jquery
description: 师傅一直在强调源码阅读的重要性，进阶之路很长
---


## Sizzle
Sizzle是一个css选择权引擎，提供的接口跟document.querySelectorAll是一样的，其输入是一串选择器字符串，输出则是一个符合这个选择器规则的DOM节点列表。

### 排版引擎解析CSS选择器时为何要从右往左解析
1. 如果正向解析，例如\「div div p em\」，我们首先就要检查当前元素到 html 的整条路径，找到最上层的 div，再往下找，如果遇到不匹配就必须回到最上层那个 div，往下再去匹配选择器中的第一个 div，回溯若干次才能确定匹配与否，效率很低。
2. 逆向匹配则不同，如果当前的 DOM 元素是 div，而不是 selector 最后的 em，那只要一步就能排除。只有在匹配时，才会不断向上找父节点进行验证。
3. 因为匹配的情况远远低于不匹配的情况，所以逆向匹配带来的优势是巨大的。同时我们也能够看出，在选择器结尾加上「*」就大大降低了这种优势，这也就是很多优化原则提到的尽量避免在选择器末尾添加通配符的原因。
4. 简单的来说**浏览器从右到左进行查找的好处是为了尽早过滤掉一些无关的样式规则和元素**

## Callbacks
### js中的caller和callee属性
caller返回一个对函数的**引用**，该函数调用了当前函数（functionName.caller）。对于函数来说，caller属性只有在函数执行时才有定义（上下文？）。

callee返回正被执行的Function对象，也就是所指定的Function对象的正文([function.]arguments.callee
可选项 function 参数是当前正在执行的 Function 对象的名称)。  

callee属性是**arguments对象的一个成员**，它表示**对函数对象本身的引用**，这有利于匿名函数的递归或者保证函数的封装性**该属性仅当相关函数正在执行时才可用**。还有需要注意的是**callee拥有length属性**.**arguments.length是实参长度，arguments.callee.length是形参长度**，由此可以判断调用时形参长度是否和实参长度一致。  

	var sum = function (n) {
    if (n <= 0)
        return 1;
    else
        return n + arguments.callee(n-1); //对函数对象本身的引用
	}

	console.log(sum(100)); //5051

### js形参和实参
在JavaScript中，有两种传值方式，**按值传递**和**引用传递**。
	
	var num_1=10; //按值传递
	var arr_1=["Tom","Peter","Smith"]; //引用传递
	var setInfo=function(num,arr){
    	num=20;
    	arr[1]="Jackson";
    	console.log(num); //20
    	console.log(arr[1]); //Jackson
	}
	setInfo(num_1,arr_1);
	console.log(num_1); //20
	console.log(arr_1[1]); //Jackson

形参与实参的数目可以不同(JavaScript中函数的形参是不能有默认值的!!!)
	
	var demo=function(m,n){  // 2个形参
    	console.log("m="+m); //10 10 10
        console.log("n="+n); //20 20 undefined
        //arguments.length是实参的长度
        console.log(arguments.length); //2 3 1
        //arguments.callee.length是形参的长度
        console.log(arguments.callee.length); //2 2 2
	}
	demo(10,20);   // 2个实参
	demo(10,20,100);  // 3个实参
	demo(10);  // 1个实参

### jquery提供的回调方式（通过callbacks.fire调用(触发)列表中的函数）
	//callbacks.fire()访问给定的上下文和参数列表中的所有回调。 
	//jquery官网的例子(感觉关键是先进先出的顺序)
	var foo = function( value ) {
 		console.log( "foo:" + value );
	};
 
	var callbacks = $.Callbacks();
 
	//向回调函数列表中添加新的回调函数
	callbacks.add( foo );
 
	callbacks.fire( "hello" ); // "foo: hello"
	callbacks.fire( "world" ); // "foo: world"
 
	var bar = function( value ){
  		console.log( "bar:" + value );
	};
 
	callbacks.add( bar );
 
	//fire()可以向回调函数中传递参数，并执行回调函数
	callbacks.fire( "hello again" ); 
	//"foo: hello again"
	//"bar: hello again"
	
	//实现原理就像下面
	var Observable = {
      callbacks: [],
      add: function(fn) {
        this.callbacks.push(fn);
      },
      fire: function() {
        this.callbacks.forEach(function(fn) {
          fn();
        })
      }
  }



