---
layout: post
title: Intellij
category: 工具
tags: IDE
description: IDE使用的一些操作
---

### IDE抽风
Intellij在使用中偶尔会抽风，就是目录结构显示失常。可以删掉IDE生成的一些文件。
解决步骤:
	
	①进入出问题的项目
	②rm -fr *.iml //.iml IntelliJ
	③rm -fr *.idea //.idea IntelliJ
	④ls -a 
	⑤rm -fr .DS_Store //.DS_Store Mac 
	⑥在Intellij中重新导入项目
	

### mac下删除intellij中是项目
打开窗口后不要点击任何项目->鼠标移动到想要删除的项目上->fn+delete->收工