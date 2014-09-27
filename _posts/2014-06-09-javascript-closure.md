---
layout: post
title: javascript执行上下文
category: 技术
tags: Javascript 
description: javascript执行上下文
---


### 上下文概念

高中语文阅读理解常有“联系上下文”答题，指文章或说话中与某一词语或文句相连的上文和下文。js中，每一个函数都要自己的上下文，可以通过this来进行访问。

### setTimeout函数
第一次遇到上下文切换的问题是关于setTimeout函数。setTimeout函数的上下文实际是window.
下面这段代码中，如果直接在setTimeout函数里面用$(this),那么实际上this指代的已经是window,而不是我要的$('#forwardRight')，所以我采用闭包解决这个问题。

	$('#forwardRight').click(function(){
        (function(m) {
        		var self = m;
	        	setTimeout(function(){
	        		$(self).css("visibility","hidden").siblings().css("visibility","visible");
	            },500);
        })(this);
    });
而实际上如果代码这么写:

	obj.setTimeout  = function(){
        var local = this; //那么说明setTimeout是obj的方法，所以this指代的就是obj而不是window了。
    } 
    
### call和apply方法
call和apply方法通常用来修改函数的上下文，函数中的this指针将被替换为call或者apply的第一个参数。
	
	//定义一个人，名字为jack
	var jack = {
   	 	name : "jack",
    	age : 26
	}
 
	//定义另一个人，名字为abruzzi
	var abruzzi = {
   	 	name : "abruzzi",
    	age : 26
	}
 
	//定义一个全局的函数对象
	function printName(){
    	return this.name;
	}
 
	//设置printName的上下文为jack, 此时的this为jack
	print(printName.call(jack));
	//设置printName的上下文为abruzzi,此时的this为abruzzi
	print(printName.call(abruzzi));
 
	print(printName.apply(jack));
	print(printName.apply(abruzzi));
	
	
### 参考链接
[访问](http://www.cnblogs.com/philzhou/p/3282216.html)
