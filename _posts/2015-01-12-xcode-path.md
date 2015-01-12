---
layout: post
title: xcode路径问题
category: 技术
tags: Git Xcode
description: 
---

本打算git branch查看一下分支的，结果给我甩出了
	
	active developer path ("/Applications/Xcode.app/Contents/Developer") does not exist, use xcode-select to change
stackoverflow给的解决办法是

	sudo xcode-select -switch /Applications/Xcode.app/Contents/Developer
但是运行完后直接报文件路径不可用。但是xcode-select -print-path 查看的路径就是/Applications/Xcode.app/Contents/Developer！！！

然后我跑到Applications目录下一瞅压根没有Xcode.app目录，但是Xcode6-Beta4.app目录在，好吧我装的是Xcode6的beta版本o(╯□╰)o，所以最终的解决办法是(但是我到底对xcode做了什么！！！)
	
	sudo xcode-select -switch /Applications/Xcode6-Beta4.app/Contents/Developer



	
	