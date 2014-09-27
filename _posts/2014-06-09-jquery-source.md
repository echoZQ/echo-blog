---
layout: post
title: jQuery常用资源
category: 备忘
tags: Jquery
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
	
	Object.prototype
	
	
	
	