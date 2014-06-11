---
layout: post
title: jQuery常用资源
category: 备忘
tags: jQuery
description: 整理过往用到的常用方法
---

## .filter(selector)过滤函数
### 将可见的example类渐隐
	$('.example').filter(":visible").fadeOut(500).siblings().fadeIn(500);

### 通过过滤函数来筛选元素
	$('li').filter(function(index) {
  		return $('strong', this).length == 1;
	}).css('background-color', 'red');