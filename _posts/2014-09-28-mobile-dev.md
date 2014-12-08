---
layout: post
title: 移动端开发
category: 总结
description: 移动端开发要做些总结了
---

### meta

	//强制让文档的宽度与设备的宽度保持1:1，并且文档最大的宽度比例是1.0，且不允许用户点击屏幕放大浏览；
	<meta content="width=device-width, initial-scale=1.0, maximum-s	cale=1.0, user-scalable=0;" name="viewport" /> 
	
	//width=device-width，它的意思是，把手机浏览器的布局视口的宽度，更改为当前设备的宽度。你还可以使用width=500这样的具体数值（也是css像素值）当屏幕宽度大于500像素时，浏览器会扩展视口（而不是放大页面）来适应屏幕：。总的来说，使用这个<meta>标签元素，就可以告诉手机浏览器当前页面应该使用的布局视口的尺寸。
	
	//告诉设备忽略将页面中的数字识别为电话号码；
	<meta content="telephone=no" name="format-detection" />
	
### 解决盒子边框溢出

	//宽度100%时边框溢出
	-webkit-box-sizing:border-box;

### 页面布局自适应

	@media screen and (max-device-width: 480px) 
	{
		img	{
			max-width:100%;height:auto;
		}
	}

### 可见视口和布局视口

在手机浏览器中，视口被划分为了两个：可见视口（visual viewport）和布局视口（layout viewport）和可见视口不同，布局视口用于元素布局和尺寸计算（比如百分比的宽度值），而且比可见视口明显要更宽。无论你缩放，或者滑动页面，甚至翻转手机屏幕，布局视口始终不变。前文介绍过<html>元素会取视口的宽度值，在手机上，这个限定和确定<html>的是布局视口。这就是手机浏览器在处理时和桌面电脑浏览器不一样的地方，而这个布局视口的引入，保证了网页在手机里中的显示与在桌面电脑上的一致。

这里有一篇博文写的非常通俗,感谢作者[访问](http://acgtofe.com/posts/2013/05/pixel-and-viewport/)
	