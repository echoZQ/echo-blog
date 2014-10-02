---
layout: post
title: 闭包与作用域链
category: 技术
tags: Javascript
description: 本周师傅让我讲作用域链，趁此机会把这个东西搞搞清楚
---

### 关于function
javascript中没有类的概念，都是函数。类有一个很重要的特性，就是可以根据它的构造函数来创建以它为模板的对象。在javascript中，函数就有2个功能
第一、 作为一般函数调用
第二、 作为它原型对象的构造函数,即new（）

### new()做了什么
1，生成一个新的对象object，类型是一个简单的object

2，把构造函数的外部，可访问的，prototype对象设置到这个新对象的内部

3，执行构造函数，在有this的地方统统指向这个新对象

4，返回这个新对象，除非返回值是非原始类型。如果是非原始类型，就返回该值

举个例子[访问](http://www.cnblogs.com/leo-penguin/archive/2010/03/20/1689048.html):

	function employee(){
      this.name="";
      this.dept="";
	}
	employee.prototype={
      say:'hello'
	}
	var p = new employee();
	
	//相当于
	var p = {}; //var p = new Object() is also correct.
	employee.apply(p);
	p.__proto__ = employee.prototype;

### 师傅的例子

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
	A.prototype.i = 9;
	console.log(a.i); //9

	a.__proto__ = B.prototype;
	console.log(a.i); //3

	console.log((typeof a) === (typeof (new B()))); //true
	
感觉属性查找的时候，先查找构造函数里的属性，如果找不到，才是查找原型链。如果要修改原型链上的属性，应当用A.prototype.i = ?
	
