---
layout: post
title: jQuery常用资源
category: 备忘
tags: jQuery
description: 整理过往用到的常用方法
---

## .filter(selector)过滤函数
### 将可见的example类渐隐
	$('.example').filter(":visible").fadeOut(500).siblings().fadeIn(500);

### 通过过滤函数来筛选元素
	$('li').filter(function(index) {
  		return $('strong', this).length == 1;
	}).css('background-color', 'red');
	
### slice
slice() 方法可从已有的数组中返回选定的元素
	
	var a = [];
	var b = [2, 3, 4];
	a = 4;  //注意是深拷贝 对a的修改就是对b的修改
如果改成
	
	var a = [];
	var b = [2, 3, 4];
	a = b.slice(); //对数组的复制
	
js伪数组:key都是数字且严格递增并且具有length成员对象(arguments)。如:
	
	var a = {"0": "data", "1": "data1", "2": "data2", "length": "3"};
	
	Array.prototype.slice.call(a); //转数组 ["data", "data1", "data2"]

### 参数类型的判断
	
	Object.prototype.toString.call(参数) //使用object原型上的方法判断参数类型
	
### $.extend

　extend()函数是jQuery的基础函数之一，作用是扩展现有的对象。注意extend可以深拷贝也可以浅拷贝，**深拷贝是拷贝实例（即源对象修改不会影响目标对象），浅拷贝是拷贝对象**。  
　extend函数三种用法:  
		
		jQuery.extend(object);  //一个参数的时候，目标对象将会被jquery本身代替
  		jQuery.extend(object1,object2,objectN);  
  		jQuery.extend(bool,object1);  
  		jQuery.extend(bool,object1,object2,objectN);
  	
  	
### jQuery.proxy()
	
	接受一个函数，然后返回一个新函数，并且这个新函数始终保持了特定的上下文语境。
	
	
	