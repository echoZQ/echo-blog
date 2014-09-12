---
layout: post
title: php常用资源
category: 备忘
tags: Php 
description: php常用资源 
---

### php中文字符串的截取
	mb_strlen( $str, $encoding ) 
	// 获取中文长度
	// $str，要计算长度的字符串 
	// $encoding，网页编码，如utf-8,GB2312,GBK 
	
	mb_substr( $str, $start, $length, $encoding ) 
	// 截取中文字符串
	// $str，需要截断的字符串 
	// $start，截断开始处，起始处为0 
	// $length，要截取的字数 
	// $encoding，网页编码，如utf-8,GB2312,GBK 
	
### php数组反向排序
	
	array_reverse() //函数传入参数为一数组，返回一个与传入参数值相同但顺序相反的数组
	
### array_key_exists

	array_key_exists(key,array)
	//array_key_exists()函数判断某个数组中是否存在指定的key，如果该key存在，则返回true，否则返回false。

### property_exists

	property_exists(mixed $class, string $property) 
	／／判断某个类是否有某个属性