---
layout: post
title: jquery插件相关
category: 备忘
tags: Jquery
description: 开发过程中使用插件所遇到及解决的问题
---

### jquery flot插件
	
	在使用flot的时候遇到横坐标对不上的问题，经查是由于flot插件的时间换算为utc的比我们的正常得到的时间小了8个小时。