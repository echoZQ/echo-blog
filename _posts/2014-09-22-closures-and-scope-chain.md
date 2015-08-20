---
layout: post
title: javascript作用域链
category: 技术
tags: Javascript
description: 本周师傅让我讲作用域链，趁此机会把这个东西搞搞清楚
---

### 关于function
javascript中没有类的概念，都是函数。类有一个很重要的特性，就是可以根据它的构造函数来创建以它为模板的对象。在javascript中，函数就有2个功能
第一、 作为一般函数调用
第二、 作为它原型对象的构造函数,即new()

### new()做了什么
1，生成一个新的对象object，类型是一个简单的object

2，把构造函数的外部，可访问的，prototype对象设置到这个新对象的内部

3，执行构造函数，在有this的地方统统指向这个新对象

4，返回这个新对象，除非返回值是非原始类型。如果是非原始类型，就返回该值

举个例子[访问](http://www.cnblogs.com/leo-penguin/archive/2010/03/20/1689048.html):

	function Person(){
      this.name="";
	}
	Person.prototype={
      say:'hello'
	}
	var p = new Person();
	
	//相当于
	var p = {}; //var p = new Object()也正确
	p.__proto__ = Person.prototype;
	Person.apply(p); 

### 关于prototype与__proto__
上面的代码中，如果我们在

		function Person(){
      		this.name="";
		}
		Person.prototype={
      		say:'hello'
		}

		var p = new Person();
		console.log(p.say); //hello
		console.log(p.__proto__ === Person.prototype); //true
		
		//------分隔线我们换种写法看看结果
		function Person(){
      		this.name="";
		}
		Person.prototype={
      		say:'hello'
		}
		var p = {};
		p.__proto__ = Person.prototype;
		Person.call(p);
		console.log(p.say); //hello

一个对象的__proto__属性，是在对象出生时，由构造函数的prototype属性决定的。那么__proto__和prototype是否可以修改呢?
	
	function Person(){
  		this.name="";
	}
	Person.prototype={
  	say:'hello'
	}

	var p = {};
	p.__proto__ = Person.prototype;
	Person.call(p);
	console.log(p.say); //hello

	Person.prototype.say = "hello world";
	console.log(p.say); //hello world
	console.log(p.__proto__.say); //hello world
	p.__proto__.say = "你好";
	console.log(p.say); //你好
	console.log(Person.prototype.say); //你好
	//由此可见prototype属性和__proto__是可以修改的，而且两者互相影响
	
那么问题就来了，什么时候修改prototype？什么时候修改__proto__?修改他们会造成什么影响?
	
	
	function Person(){
  		this.name="";
	}
	Person.prototype={
  		say:'hello'
	}

	var p = {};
	p.__proto__ = Person.prototype;
	Person.call(p);

	Person.prototype.say = "hello world";

	console.log("-------2333我是一条分割线")
	var p1 = new Person();
	console.log(p1.say); //hello world
	
	
	function Person(){
  		this.name="";
	}
	Person.prototype={
  		say:'hello'
	}

	var p = {};
	p.__proto__ = Person.prototype;
	Person.call(p);

	p.__proto__.say = "你好";
	console.log(Person.prototype.say);  //你好

	console.log("-------2333我是一条分割线")
	var p1 = new Person();
	console.log(p1.say); //你好
从上面两个例子我们可以发现，修改一个对象的__proto__和修改其构造函数的prototype表面上的效果是一样的(即__proto__能够修改一个对象的原型继承链)，改了__proto__等于改了prototype,同时影响到了其他由此构造函数生成的对象(当修改了对象的__proto__后，就相当于修改了对象的整个继承结构)，我们应当保证原型链继承的稳定。还有我们要记住的一点是，不是所有的js执行环境都支持__proto__的(IE), 且按照标准来说__proto__属性应当是一个私有属性不应该被公开，只是firefox的引擎将其暴露出来罢了。

关于是否应该修改__proto__我还没有深入了解，暂且参考[Effective JavaScript Item 32 绝不要修改__proto__](http://blog.csdn.net/dm_vincent/article/details/39692899)

#### js中的类
js里的类就是构造函数，Object，Function，Array，Date，这些大写字母开头的东西，都是函数而已 
也就是说，Object，Function，Array。。(他们都是需要new的)等等，它们的类型都是Function   
	
	console.log(Object.__proto__ === Function.prototype); //true
	console.log(Function.__proto__ === Function.prototype); //true
	console.log(Array.__proto__ === Function.prototype); //true
	console.log(Date.__proto__ === Function.prototype); //true
JS中还有一些内置的对象，如Math，Json等，他们是以**内置对象**的形式存在的，**无需new**。所以他们的__proto__是Object.prototype
	
	console.log(Math.__proto__ === Object.prototype); //true
	console.log(JSON.__proto__ === Object.prototype); //true

上述表现说明了**所有的构造器都来自于Function.prototype，甚至包括根构造器Object及Function自身**。所有构造器都继承了Function.prototype的属性及方法。如length、call、apply、bind（ES5）
	
Function.prototype也是唯一一个typeof XXX.prototype为 “function”的prototype，其他的构造器的prototype都是一个对象。
	
	console.log(typeof Function.prototype === "function");  //true
	alert(Function.prototype); //function() {} //一个空对象
	console.log(Object.prototype.__proto__ === null ); //true 到顶了

### constructor 设置原型的两种方式
我们知道原型可以有两张写法。
	
	var Person = function () {
	};
	
	//修改原型
	Person.prototype.say = function () {
		console.log("hello");
	}
	var p = new Person();
	console.log(p.__proto__ === Person.prototype); //true
	console.log(p.__proto__ === p.constructor.prototype); //true
	//每个对象都有constructor属性，且p.__proto__ === Person.prototype === p.constructor.prototype
	
然后我们看第二种写法
	
	var Person = function () {
	};
	
	//相当于重写了原型
	Person.prototype = {
		say: function () {
			console.log("hello");
		}
	}

	var p = new Person();
	console.log(p.__proto__ === Person.prototype); //true
	console.log(p.__proto__ === p.constructor.prototype); //false
	
这潭水太深了我去[JavaScript中__proto__与prototype的关系](http://blog.csdn.net/xuanze520/article/details/8531274)

### 一个例子

	var A = function() {
    	this.i = 1;
	}

	A.prototype = {
    	i: 2
	}

	var B = function() {
    	this.i = 1;
	}

	B.prototype= {
    	i : 3
	}

	var a = new A();
	delete a.i; //删除的不是原型链上的值
	console.log(a.i);  //2 查找原型链上的i
	a.i = 5; //重新赋值自身属性
	console.log(a.i); //找的是this.i
	delete a.i; //删除的不是原型链上的值
	A.prototype.i = 9; //注意是A而不是a,如果是a.prototype.i是错误的
	console.log(a.i); //9

	a.__proto__ = B.prototype;
	console.log(a.i); //3

	console.log((typeof a) === (typeof (new B()))); //true
	
感觉属性查找的时候，先查找构造函数里的属性，如果找不到，才是查找原型链(查找方法也是一样)。如果要修改原型链上的属性，应当用A.prototype.i = ?,要取原型链上的值应当是console.log(A.prototype.i)。
	
