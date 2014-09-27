---
layout: post
title: css动画
category: 技术
tags: Css
description: 前端补课
---

### css3 animation
w3c上说“为了得到最佳的浏览器支持，您应该始终定义 0% 和 100% 选择器“。
下面记录两个之前没用到过的属性:

	①animation-play-state：paused/running 规定动画正在运行还是终止
	②animation-fill-mode：none/forwards/backwards/both 规定动画在播放之前或之后，其动画效果是否可见。

css3动画跟css3的2D和3D转换,css3过渡等综合使用。

### csss 3D
张鑫旭的文章写的很黄很暴力[访问](http://www.zhangxinxu.com/wordpress/2012/09/css3-3d-transform-perspective-animate-transition/)

关键几点:
3D transform中有下面这三个方法：

	rotateX( angle )
	rotateY( angle )
	rotateZ( angle )
	//rotate旋转的意思，rotateX旋转X轴，rotateY旋转Y轴，rotateZ旋转Z轴(三维坐标)
	
	perspective(透视，视角),没有透视不成3D
	
###js动画与css3动画

现有的前端动画体系中，通常有两种模式：JS动画与CSS3动画。 JS动画是通过JS动态改写样式实现动画能力的一种方案，在PC端兼容低端浏览器中不失为一种推荐方案。 而在移动端，我们选择性能更优浏览器原生实现方案：CSS3动画.但是css3动画移动多终端设备场景下，相比PC会面对更多的性能问题，主要体现在动画的卡顿与闪烁。

目前对提升移动端CSS3动画体验的主要方法有几点：
尽可能多的利用硬件能力，如使用3D变形来开启GPU加速

	-webkit-transform: translate3d(0, 0, 0);
	-moz-transform: translate3d(0, 0, 0);
	-ms-transform: translate3d(0, 0, 0);
	transform: translate3d(0, 0, 0);
	如动画过程有闪烁（通常发生在动画开始的时候），可以尝试下面的Hack：

	-webkit-backface-visibility: hidden;
	-moz-backface-visibility: hidden;
	-ms-backface-visibility: hidden;
	backface-visibility: hidden;
 
	-webkit-perspective: 1000;
	-moz-perspective: 1000;
	-ms-perspective: 1000;
	perspective: 1000;
	
	一个元素通过translate3d右移500px的动画流畅度会明显优于使用left属性
	
	尽可能少的使用box-shadows与gradients

box-shadows与gradients往往都是页面的性能杀手，尤其是在一个元素同时都使用了它们，所以拥抱扁平化设计吧。

尽可能的让动画元素不在文档流中，以减少重排
	position: fixed;
	position: absolute;
以上来自[访问](http://www.qianduan.net/high-performance-css3-animations.html)