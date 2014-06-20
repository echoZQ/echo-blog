---
layout: post
title: apache虚拟主机配置
category: 备忘
tags: Apache
description: 虽然换了Mac用起了Nginx,但是Apached的配置说不定还用的着~
---

四月的时候换了Mac,由于星海是Nginx脑残粉，于是我“被迫”抛弃了Apache。

但是Apache的配置方式还是得记一下:

## vhosts文件
需要在apache的vhosts文件下添加下面这段代码:

    NameVirtualHost *:80
    <VirtualHost *:80>
    ServerName bishe.test.com
	DocumentRoot "E:/apps/bishe"
	<Directory "E:/apps/bishe">
	Options FollowSymLinks IncludesNOEXEC Indexes
	DirectoryIndex index.html index.htm default.htm index.php 	default.php index.cgi default.cgi index.pl default.pl 	index.shtml
	AllowOverride Options FileInfo
	Order Deny,Allow
	Allow from all
	</Directory>
	</VirtualHost> 

## hosts文件
	127.0.0.1 bishe.test.com