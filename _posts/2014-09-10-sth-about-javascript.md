---
layout: post
title: javascript基础
category: 阅读
tags: Javascript 
description: 汤姆大叔的博客阅读~
---

## Chapter 1
### 创建隐式全局变量的反例-使用任务链进行部分var声明

	//反例，勿使用 
	function foo() {
    	var a = b = 0;  //a是本地变量但b是全局变量
   		// ...
	}
	
	//正确
	function foo() {
    	var a, b;
   		// ... a = b = 0; // 两个均为局部变量   
	}

### 隐式全局变量和明确定义的全局变量间的差异

通过var创建的全局变量（任何函数之外的程序中创建）是不能被删除的。

无var创建的隐式全局变量（无视是否在函数中创建）是能被删除的。

在技术上，*隐式全局变量并不是真正的全局变量*，但它们是全局对象的属性。*属性是可以通过delete操作符删除的，而变量是不能的。*

### for循环
	
	//不足在于每次循环的时候数组的长度都要去获取下(反例)
	for (var i = 0; i < myarray.length; i++) {
   		// 使用myarray[i]做点什么
	}		

### 左花括号的位置
	
	// 警告： 意外的返回值
	function func() {
    	return
  		// 下面代码不执行 由于隐含分号，函数返回undefined
   		{
      		name : "Batman"
   		}
	}

## Chapter 5
