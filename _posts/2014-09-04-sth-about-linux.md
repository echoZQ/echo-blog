---
layout: post
title: linux相关
category: 备忘 
tags: linux
description: 每天积累一点，多看别人的博客
---

在terminal中提交代码到git上去的时候，常常会提示错误信息。
其实这是因为vi没有正常退出或者多个程序编辑同一文件产生了.swp
文件。解决办法是删掉.swp文件(rm -fr *.swp)

所以要注意:
当你打开一个文件，vi就会生成这么一个.swp文件以备不测，如果你正常退出，那么这个swp文件将会自动删除。
不测分为：1用多个程序编辑同一个文件；2非常规退出；