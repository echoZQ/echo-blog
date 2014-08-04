---
layout: post
title: php常用资源
category: 备忘
tags: Php 
description: php常用资源 
---

## php中文字符串的截取
	mb_strlen( $str, $encoding ) 
	// 获取中文长度
	// $str，要计算长度的字符串 
	// $encoding，网页编码，如utf-8,GB2312,G
	BK 
	
	mb_substr( $str, $start, $length, $encoding ) 
	// 截取中文字符串
	// $str，需要截断的字符串 
	// $start，截断开始处，起始处为0 
	// $length，要截取的字数 
	// $encoding，网页编码，如utf-8,GB2312,GBK 