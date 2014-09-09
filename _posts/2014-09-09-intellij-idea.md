---
layout: post
title: Intellij idea抽风处理
category: 工具
tags: IDE
description: IDE抽风处理
---

Intellij在使用中偶尔会抽风，就是目录结构显示失常。
解决步骤:
	
	①进入出问题的项目
	②rm -fr *.iml
	③rm -fr *.idea
	④ls -a 
	⑤rm -fr .DS_Store
	⑥在Intellij中重新导入项目