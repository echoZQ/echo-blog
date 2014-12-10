---
layout: post
title: css基础补习
category: 阅读
tags: Css
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
  	
### 注意点
	1.如果没有content属性，伪类元素将没有任何作用。但是可以指定content为空，同时正如前面所说，插入的内容默认是一个行内元素，并且在HTML源代码中无法看到，这就是为什么称之为伪类元素的理由，所以也就无法通过DOM对其进行操作。  
	2:after无法作用在img上
	

### z-index层级树
**从父规则: 父节点的层级决定了子节点所在层级！！！**    

position 设为 relative (相对定位), absolute (绝对定位) 或者 fixed (固定定位)默认层级比属性值为 static的高  

在 z-index 属性仅在节点的 position 属性为 relative, absolute 或者 fixed 时生效.

参考链接[访问](http://www.neoease.com/css-z-index-property-and-layering-tree/)

### word-wrap和word-break
word-wrap: 用来标明是否允许浏览器在单词内进行断句，这是为了防止当一个字符串太长而找不到它的自然断句点时产生溢出现象（最重要的一点是它还是会**首先尝试挪到下一行，看看下一行的宽度够不够**，不够的话就进行单词内的断句）。  
word-break: 用来标明怎么样进行单词内的断句（它不会尝试把长单词挪到下一行，而是直接进行单词内的断句。感觉word-brenak更常用一些）。