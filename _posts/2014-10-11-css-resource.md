---
layout: post
title: css资源
category: 备忘
tags: Css
description: 阅读大牛博客，收获前端技巧
---

最近项目比较闲，看看各路大神的博客涨涨知识==

### 按钮文字无缝变菊花
其实就是按钮的loading效果，我之前的做法是加一个loading的div，通过该div的隐藏和显示来实现。  
今天看到张鑫旭大神的[访问](http://www.zhangxinxu.com/wordpress/2014/11/button-text-to-loading/)又收获了一种方法。  color: transparent应该可以用到更多的地方。
	
	.loading {
    	color: transparent;    /* 文字消失 transparent透明*/
    	background: #xxxxxx url(loading.gif) no-repeat center;   /* 菊花在背景色中间出现 */
	}
	
### 背景色镂空技术
做广场舞项目的时候，考虑到http请求及图片颜色的问题，使用了Font-Awesome图表库，这玩意蛮好用的，但是痛苦的地方在于浏览器的兼容性。不用chrome标准渲染的时候，IE7、8什么的各种不兼容尼玛，所有我只能用Font-Awesome的同时借助阿里矢量图标库(http://iconfont.cn/)及一些css hack兼容IE等浏览器。  
今天看到大神提供的又一种方案[访问](http://www.zhangxinxu.com/wordpress/2013/07/css-%E8%83%8C%E6%99%AF%E8%89%B2%E5%9B%BE%E7%89%87%E9%95%82%E7%A9%BA%E6%8A%80%E6%9C%AF/)即使用镂空的背景图(一般把icon做成sprite),然后用background改变颜色。  
话说直接用图片做成sprite比较好还是用字体库好还真是个问题。

这个部分还涉及了css3的一个关键字currentColor

### HTML5 响应式图片

	//关于背景
	background-image:url(http://img02.taobaocdn.com/tps/i2/T10s3JXn4XXXXnbIAn-105-160.png);/* 普通屏幕 */
	background-image: -webkit-image-set(
    url(http://img02.taobaocdn.com/tps/i2/T10s3JXn4XXXXnbIAn-105-160.png) 1x,
    url(http://img04.taobaocdn.com/tps/i4/T1947tXmJhXXcCfooh-210-320.png) 2x);/* Retina */
    
    
    //关于html中的img元素
    <picture width="500" height="500">
		<source media="(min-width: 45em)" srcset="large-1.jpg 1x, large-2.jpg 2x">
		<source media="(min-width: 18em)" srcset="med-1.jpg 1x, med-2.jpg 2x">
		<source srcset="small-1.jpg 1x, small-2.jpg 2x">
		<img src="small-1.jpg" alt="">
	</picture>

关于image-set还是有问题的，当初页面在某个华为还是什么机子上的时候直接背景就挂了==

### 透明背景
在用bootstrap wysiwyg这个富文本编辑器的插件时,发现用图替换input file的方法是对input用绝对定位，然后透明的放在icon上面。

	element.style {
		opacity: 0;
		position: absolute;
		top: 0px;
		left: 0px;
		width: 36px;
		height: 30px;
	}
背景透明还是有很多妙用的。

博客链接[访问](http://ued.taobao.org/blog/2013/01/css-and-html5-adaptive-images/)


