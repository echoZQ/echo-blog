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

  
## Deferred(异步处理) 看不懂!
以ajax请求为例，因为**无阻塞（异步）**，代码在发送AJAX这个请求后会继续执行，那么后续的操作**如果依赖这个数据就会出错！！！**，所以就需要等待AJAX返回，才能执行后续操作。**异步会导致流程不正确**
	
	//简单的例子 结果会是: 1 3 2
	console.log(1)
	setTimeout(function(){
    	console.log(2);
	},0)
	console.log(3)；

### promise
promise作为一个模型，提供了一个在软件工程中描述延时（或将来）概念的解决方案。  
它背后的思想不是执行一个方法然后阻塞应用程序等待结果返回，而是返回一个promise对象来**满足未来值**（提前预知了结果???从而写好解决办法???）。

promise回调会在处于以下两种不同的状态下执行：  
resolved：在这种情况下，数据是可用  
rejected：在这种情况下，出现了错误，没有可用的值  

	//伪代码
	promise.then( function( futureValue ) {   
   		//成功    
	} , function() {   
  		//失败
	});
### 源码解析
callback被剥离出去后，整个deferred就显得非常的精简

	//当jQuery.extend只有一个参数的时候，其实就是对jQuery静态方法的一个扩展
	jQuery.extend({ 
    	Deferred : function(){}
    	when : function(){}
	)}
	
## 数据缓存
一般jQuery开发，我们都喜欢便捷的把很多属性，比如**状态标志都写到dom节点中（自己常干的事==）**,也就是HTMLElement  
好处：直观，便捷  
坏处：循环引用、直接暴露数据，安全性低、增加一堆的自定义属性标签，对浏览器来说是没意义的、取数据的时候要对HTML节点做操作
### 内存泄露
内存泄露的几种情况  
1. 循环引用  
2. Javascript闭包  
3. DOM插入顺序  
一个DOM对象被一个Javascript对象引用，与此同时又引用同一个或其它的Javascript对象，这个DOM对象可能会引发内存泄漏。这个DOM对象的引用将不会在脚本停止的时候被垃圾回收器回收。要想破坏循环引用，引用DOM元素的对象或DOM对象的引用需要被赋值为**null**。    

JS的内存泄露，无怪乎就是**从DOM中remove了元素，但是依然有变量或者对象引用了该DOM对象！！！！！**。然后内存中无法删除。使得浏览器的内存占用居高不下。这种内存占用，随着浏览器的刷新，会自动释放。  
而另外一种情况，就是循环引用，一个DOM对象和JS对象之间互相引用，这样造成的情况更严重一些，即使刷新，内存也不会减少。这就是严格意义上说的内存泄露了。

所以在平时实际应用中, 我们经常需要**给元素缓存一些数据**，并且这些数据往往和DOM元素紧密相关。由于DOM元素(节点)也是对象, 所以我们可以直接扩展DOM元素的属性，但是**如果给DOM元素添加自定义的属性和过多的数据可能会引起内存泄漏**，所以应该要尽量避免这样做。因此更好的解决方法是使用一种低耦合的方式**让DOM和缓存数据能够联系起来**。

### Data
### jQuery引入缓存的作用
1. 允许我们在DOM元素上附加任意类型的数据,避免了循环引用的内存泄漏风险
2. 用于存储跟dom节点相关的数据，包括事件，动画等
3. 一种低耦合的方式让DOM和缓存数据能够联系起来

jQuery.data( element, key, value ) //$.data( element, key, value )可以对DOM元素附加任何类型的数据，但应避免循环引用而导致的内存泄漏问题

data的实现**不像attr直接把数据作为属性捆绑到元素节点上**，如果为DOM Element 附加数据；DOM Element 也是一种 Object ，但 IE6、IE7 对直接附加在 DOM Element 上的对象的垃圾回收存在问题；因此我们将这些数据存放在全局缓存（我们称之为“globalCache”）中，即 “globalCache” 包含了多个 DOM Element 的 “cache”，并在 DOM Element 上添加一个属性，存放 “cache” 对应的uid。

$().data('a') 在表现形式上，虽然是关联到dom上的，但是实际上处理就是**在内存区开辟一个cache的缓存**

### $('').data([key],[value])与$.data(element,[key],[value])
	
	//二者实现不同
	var aa1=$("#aaron");
	var aa2=$("#aaron");

	aa1.data('a',1111);
	aa2.data('a',2222);
	aa1.data('a')  //结果222222
	aa2.data('a')  //结果222222

	$.data(aa1,"b","1111")
	$.data(aa2,"b","2222")
	$.data(aa1,"b")   //结果111111
	$.data(aa2,"b")   //结果222222

### $(‘’).data()的实现方式
	//用name和value为对象附加数据
	var obj = {};
    $.data(obj, 'name', 'echo');
    $.data(obj,'name') //echo

	//一个对象为对象附加数据
	var obj = {};
    $.data(obj, {
        name1: 'echo',
        name2: 'echo'
    });
    $.data(obj)   //Object {name1: "echo", name2: "echo"}
### 总结
说到底，数据缓存就是**在目标对象与缓存体间建立一对一的关系**,整个Data类其实都是围绕着thia.cache内部的数据做增删改查的操作。

	//cache对象的内部结构应该像这样
	var cache = {
    "uid1": { // DOM节点1缓存数据，
        "name1": value1,
        "name2": value2
    },
    "uid2": { // DOM节点2缓存数据，
        "name1": value1,
        "name2": value2
    }
    // ......
	};
	//每个uid对应一个elem缓存数据，每个缓存对象是可以由多个name/value(名值对)对组成的，而value是可以是**任何数据类型**的。
	

## 回溯方法(end和putStack)
了解了jQuery对DOM进行**遍历**背后的工作机制，可以在编写代码时有意识地避免一些不必要的重复操作，从而提升代码的性能！！！。  
jQuery选择器通过jQuery处理后返回的不仅仅只有dom对象，而是一个包装容器。

### jQuery对象栈（减少重复操作是优化jQuery代码性能的关键所在！）

jQuery内部维护着一个jQuery对象栈。每个遍历方法都会找到一组新元素（一个jQuery对象），然后jQuery会把这组元素推入到栈中。

而每个jQuery对象都有三个属性：**context、selector和prevObject**，其中的prevObject属性就指向这个对象栈中的前一个对象，而通过这个属性可以回溯到最初的DOM元素集。
### end()

**链式的原理就是要返回当前操作的上下文**
	
	//给子节点绑定事件后再给父节点绑定事件 链式，精简代码
	$('ul').find('li').click(function(){
        alert(1);
    }).end().click(function(){
        alert(2); //jQuery引入一个机制，可以通过end()方法回溯到前一个dom对象
    })
    
    //错误 上下文被切换
    $('ul.first').find('.foo').css('background-color', 'red').find('.bar').css('background-color', 'green');
    
    //正确
    $('ul.first').find('.foo').css('background-color', 'red').end().find('.bar').css('background-color', 'green');

### pushStack
pushStack: 将一个DOM元素集合加入到jQuery栈  
流程解析：

1. 构建一个新的jQuery对象，无参 this.constructor()，只是返回引用this

2. jQuery.merge 把elems节点，合并到新的jQuery对象

3. 给返回的新jQuery对象添加属性prevObject ，所以我们看到prevObject 其实还是当前jQuery的一个引用罢了

