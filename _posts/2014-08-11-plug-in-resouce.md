---
layout: post
title: jquery插件相关
category: 备忘
tags: jQuery
description: 开发过程中使用插件所遇到及解决的问题
---

### jQuery Flot插件
在使用flot的时候遇到横坐标对不上的问题，经查是由于flot插件的时间换算为utc的比我们的正常得到的时间小了8个小时。

### Swipe 轻量级js触摸滑动类库
swipe支持zepto，用于移动端图片轮播还是很不错的。	

### Fastclick-解决在手机上点击事件的300ms延迟
这个js主要是消除移动裝置触碰屏幕的300ms的delay。引入js后直接

	FastClick.attach(document.body);
### jQuery validate
很好用的表单验证插件，兼容性也不错。但在IE7（兼容模式）下出现“找不到成员”的脚本错误(SCRIPT3：找不到成员)。在jquery.validate.js中找到以下内容,注释掉即可。

	// Add novalidate tag if HTML5.
	this.attr( "novalidate", "novalidate" );
