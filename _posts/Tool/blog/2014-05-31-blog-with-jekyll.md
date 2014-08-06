---
layout: post
title: 我的个人博客
category: 工具
description: 很早以前就想拥有一个个人博客【感觉很酷~】，不过拖延症犯了大半年，要开启反省模式了~实习的半年时间里真的体会到，一个不会总结的程序员就是个臭棋篓子【就是说自己呢~】
---
以前用windows系统的时候尝试用jekyll搭过博客，反正捣鼓到最后还是没有真正用起来。开个博客占个地盘来回顾一下接触前端的半年里学到的知识和项目经验，努力成为少挖坑的好妹子~

网上资料很多，下面简单记录一下这次用mac搭建个人博客的步骤:

### 升级gem

	sudo gem update --system
### 修改gem源

	gem sources #查看源列表
	gem sources --remove http://xxx.org #移除不需要的他源
	gem sources -a http://ruby.taobao.org/ #淘宝镜像就够了
### 安装Jekyll
	
	sudo gem install jekyll
	
### 创建默认的目录结构
文件目录不阐述了~详解[访问](http://www.soimort.org/posts/101/)和[访问](http://bg.biedalian.com/2013/08/01/use-jekyll.html)
	
### 本地测试
jekyll --server 若本地服务器启动正常，打开浏览器，输入地址：http://localhost:4000，若没有问题的话，可以看到index.html的内容。	

## 遇到的坑
根目录没有正确配置，本地及正式环境下博客的链接地址都少了echo-blog(项目名),其实只要在_config.yml文件中加上
	
	# 根目录
	baseurl: /echo-blog

然后将导航的href里写成如下

	<a href="{{ site.baseurl }}{{ post.url }}">{{post.title}}</a>
将根目录加上去就好了。

这个问题居然瞎纠结了好久，反射弧果然太长了。。。




无意间搜索到闫肃【感谢感恩】[访问](http://yansu.org/)的个人博客，特别喜欢前辈博客的界面风格和分类。在此先套用他的模板把博客写起来，原来代码也可以很优雅~所以，从模仿开始，自己去实现一遍【todo】。

## 参考链接【感谢作者】

模板[访问](http://yansu.org/)

目录结构[访问](http://jekyllcn.com/docs/github-pages/)

源及jekyll安装[访问](http://zhanglubing.github.io/2012-08-15/setup-jekyll-step-by-step.html)


配置文件及默认变量[访问](http://bg.biedalian.com/2013/08/01/use-jekyll.html)

文章分类索引[访问](http://blog.segmentfault.com/skyinlayer/1190000000406017) [访问](http://pchou.info/web-build/2013/01/09/build-github-blog-page-06.html)

Markdown换行,加链接等写法[访问](http://jekyllcn.com/docs/github-pages/)  [访问](http://wowubuntu.com/markdown/#p)




