---
layout: post
title: css常用资源
category: 备忘
tags: Css 
description: 总结一些记得不是很清楚的css属性
---
### 做通告显示的时候碰到了字数超出的问题，css加省略号的方法为(注意:使用在文本的直接父级才有效)
	
	//原需求为通告之间上下滚动，若某条通告过长则自右向左滚动。css暂未找到合适的解决方案，目前还没有浏览器支持overflow-style:marquee,panner;
	
	text-overflow:ellipsis; 
	white-space: nowrap; //限制不换行	
	overflow: hidden;
	
## 用css去除chrome、safari等webikt内核浏览器对控件默认样式
### 去除chrome浏览器下input和textarea点击选中框

input和textarea在聚焦的时候都有一个黄色的边框，而且textarea还可以任意拖动放大，这是不能容忍的。

	//重置input和textarea的默认样式
	input,button,select,textarea {
		outline:none
	}
	textarea {
		resize:none
	}
	*:focus {
		outline: none;
	}
### -webkit-appearance [访问](http://www.w3cplus.com/css3/changing-appearance-of-element-with-css3.html)

做流量充值手机端页面的时候发现华为机的UC浏览器下 select的边框去不掉，其实可以使用:

	//去掉浏览器的默认样式
	-webkit-appearance: none; 
	-moz-appearance: none;
	appearance: none;

此外这个属性还可以用来调用显示浏览器对各种控件的默认样式。如:

	<span style="-webkit-appearance:button;"> 我是span啊亲!!</span>

## css hack
IE9及以下浏览器 "\9"  
IE7及以下浏览器 "\*"  
IE6 "\_"  
如

	.ie6_7_8{
    	color:blue; /*所有浏览器*/
    	color:red\9; /*IE8以及以下版本浏览器,其实就是为了IE8,因为IE8既不支持*又不支持_*/
       *color:green; /*IE7及其以下版本浏览器*/
   		_color:purple; /*IE6浏览器*/
	}
	