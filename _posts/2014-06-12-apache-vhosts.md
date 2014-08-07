---
layout: post
title: apache虚拟主机配置
category: 备忘
tags: Apache
description: 虽然换了Mac用起了Nginx,但是Apached配置虚拟主机说不定还用的着~
---

四月的时候换了Mac,由于星海是Nginx脑残粉，于是我“被迫”抛弃了Apache。

但是Apache在windows系统下的配置虚拟主机还是小记一下【直接上的XAMPP】:

## vhosts文件
每配一个虚拟主机，需要在 apache/conf/extra/httpd-vhosts.conf文件下添加如下代码:

    NameVirtualHost *:80 
    <VirtualHost *:80>
    ServerName bishe.test.com  //域名
	DocumentRoot "E:/apps/bishe"  //项目文件位置
	<Directory "E:/apps/bishe">
	Options FollowSymLinks IncludesNOEXEC Indexes
	DirectoryIndex index.html index.htm default.htm index.php 	default.php index.cgi default.cgi index.pl default.pl 	index.shtml  //默认文件(从左到右查找，理解成了入口)
	AllowOverride Options FileInfo  //访问权限
	Order Deny,Allow
	Allow from all
	</Directory>
	</VirtualHost> 

## hosts文件配置
需要在 C:\WINDOWS\system32\drivers\etc文件下的hosts文件中添加对应的本机IP及虚拟主机名【一般需要管理员权限打开】
	
	127.0.0.1 bishe.test.com //DNS指向的域名与vhosts文件中添加的域名一致
	
### 插播hosts文件相关
    
访问网站时，对hosts文件的请求级别比DNS服务器高，因此修改hosts文件可以对指定的网址进行处理，达到防止用户访问特定网站的效果。

访问网络时，计算机向DNS服务器发送一个网络域名，DNS服务器则把这个域名解析成为一个IP地址后返回给计算机。这个过程会使访问网站的速度减慢，在hosts文件中添加指定的IP地址，可使DNS服务器不用对网页的地址进行解析，从而加快访问网站的速度。

	
所以正确修改hosts文件可以屏蔽特定网站和加速访问网站DNS转向。

### todo
.htaccess文件

## 参考链接[感谢作者]

[访问](http://www.ittribalwo.com/article/229.html)

[访问](http://wenku.baidu.com/view/00300a32eefdc8d376ee3219.html)