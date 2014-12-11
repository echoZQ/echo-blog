---
layout: post
title: css资源
category: 资源
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



