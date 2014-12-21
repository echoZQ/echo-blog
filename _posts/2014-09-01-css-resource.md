---
layout: post
title: css基础补习
category: 阅读
tags: Css
description: 每天积累一点，多看别人的博客
---

### inline和inline-block的区别
inline
①支持左右方向的margin和padding，但是不支持上下方向的margin和padding
②不能设置宽度和高度
③允许其他元素在同一行

line-block
①支持上下左右的margin和padding值
②支持高度和宽度设置
③允许其他元素在同一行

### clear
之前对clear的理解一直是错误的
clear: 规定元素的哪一侧不允许其他浮动元素。

### background-color：transparent
背景颜色为透明

### 伪类
#### 在:before和:after中使用图片(伪类元素默认是inline)
	
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
	
#### 清除浮动
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
  	
#### 注意点
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
	
### display:none和viibility:hidden
使用visibility:hidden属性会使对象不可见，但该对象在网页所占的空间没有改变（看不见但摸得到），等于留出了一块空白区域，而 display:none属性会使这个对象彻底消失（看不见也摸不到）。  

**这两个属性对元素背景图片加载也有影响。没有用到的CSS及父容器的display被设为none的情况下，CSS引用的图片是不会被加载的，而父容器设置visibility属性为hidden仍然会加载图片！！！**

### css hack
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

### :nth-child和:nth-of-type

对于:nth-child(2)选择器，在简单白话文中，意味着选择一个元素需要同时满足：  
这是个段落元素  
这是父标签的第二个孩子元素  

对于:nth-of-type(2)选择器，意味着选择一个元素如果：
选择父标签的第二个段落子元素

[访问](http://www.zhangxinxu.com/wordpress/2011/06/css3%E9%80%89%E6%8B%A9%E5%99%A8nth-child%E5%92%8Cnth-of-type%E4%B9%8B%E9%97%B4%E7%9A%84%E5%B7%AE%E5%BC%82/)
