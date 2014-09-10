---
layout: post
title: Intellij idea抽风处理
category: 工具
tags: IDE
description: IDE抽风处理
---

Intellij在使用中偶尔会抽风，就是目录结构显示失常。可以删掉IDE生成的一些文件。
解决步骤:
	
	①进入出问题的项目
	②rm -fr *.iml //.iml IntelliJ
	③rm -fr *.idea //.idea IntelliJ
	④ls -a 
	⑤rm -fr .DS_Store //.DS_Store Mac 
	⑥在Intellij中重新导入项目
	

	