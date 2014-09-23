---
layout: post
title: css常用资源
category: 备忘
tags: css 
description: 总结一些记得不是很清楚的css属性
---
### 做通告显示的时候碰到了字数超出的问题，css加省略号的方法为(注意:使用在文本的直接父级才有效)
	
	//原需求为通告之间上下滚动，若某条通告过长则自右向左滚动。css暂未找到合适的解决方案，目前还没有浏览器支持overflow-style:marquee,panner;
	
	text-overflow:ellipsis; 
	white-space: nowrap; //限制不换行
	overflow: hidden;
### 去除chrome浏览器下input和textarea点击选中框

input和textarea在聚焦的时候都有一个黄色的边框，而且textarea还可以任意拖动放大，这是不能容忍的。

	//重置input和textarea的默认样式
	input,button,select,textarea {
		outline:none
	}
	textarea {
		resize:none
	}