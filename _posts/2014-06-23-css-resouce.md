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

