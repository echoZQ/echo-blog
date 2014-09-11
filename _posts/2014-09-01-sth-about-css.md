---
layout: post
title: css基础补习
category: 阅读
tags: css
description: 每天积累一点，多看别人的博客
---

## inline和inline-block的区别
inline
①支持左右方向的margin和padding，但是不支持上下方向的margin和padding
②不能设置宽度和高度
③允许其他元素在同一行

line-block
①支持上下左右的margin和padding值
②支持高度和宽度设置
③允许其他元素在同一行

## clear
之前对clear的理解一直是错误的
clear: 规定元素的哪一侧不允许其他浮动元素。

### background-color：transparent
背景颜色为透明

## 伪类
### 在:before和:after中使用图片(伪类元素默认是inline)
	
	//对图片设置宽高无效
	#id:before
	{
   		content: url("icons.png");
    	height: 50%;
    	width: 50%;
	}
	
	//可以通过将图片设置成背景解决
	#div:before
	{
    	display: inline-block;
    	width: 16px; //宽高度不要遗漏
    	height: 16px;
    	margin-right: 5px;
    	content: "";
    	background: url("icons.png") no-repeat 0 0;
    	background-size: 100%;
	}
	
### 清除浮动
伪元素:after另外一个常用的作用就是清除浮动。在CSS中加入带有CSS伪类:after的内容：    
	
	.clear:after {
  		height:0;   
  		content:".";   
  		clear:both;   
  		display:block;   
  		visibility:hidden;   
		}

    然后在外面的Div容器box中引用这个class，比如：  
	<div id="box" class="clear">
  		……
  		……
  	</div>