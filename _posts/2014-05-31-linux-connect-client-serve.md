---
layout: post
title: 本地工程上传至服务器
category: 技术
tags: Linux 
description: 第一次自己更新网站
---

场景:将本地工程上传至服务器  
工程名:xxx  
本地地址:workspace/xxx  
服务器地址:yyy  
宿主机地址:zzz

## 具体步骤
- git archive 将xxx项目打包成.zip格式
- 通过scp将压缩包上传至服务器,再上传至宿主机
- 创建application下的cache和logs文件夹
- chown www-data更改所属人和权限 
- 修改application/config下面的db文件

## 具体命令

- git archive master --prefix='xxx/' --format=zip >xxx.zip  [进入xxx目录下执行压缩]
- scp xxx.zip root@yyy:/root/ [通过ssh把文件复制到服务器宿主机]
- ssh root@yyy [ls查看上传.zip文件是否成功  exit退出ssh]
- scp xxx.zip root@zzz:/data/www [从服务器上把文件复制到虚拟机root@zzz:/data/www目录下] 如果是tar打包那就是scp xxx.tar.gz root@zzz:/data/www
- ssh root@zzz [登陆虚拟机]
- cd /data/www [查看有没有xxx的文件]
- mv xxx xxx-今天的日期 [重命名文件夹,保留之前的版本，备份]
- mkdir xxx [创建新文件夹]
- mv xxx.zip xxx [将压缩文件移动到新建的newstart文件夹下]
- cd xxx 
- unzip xxx.zip [解压缩文件]
- cd ..
- mv xxx  xxx-test [更改xxx文件夹的名字]
- cd xxx-test 
- mv xxx .. [将xxx文件夹移到上一级目录]
- 创建application/cache和logs
- 进到application/config修改数据库文件
- 最后要改cache和logs文件夹的权限，直接改成777权限不安全，所以用chown -R www-data:www-data xxx
[-R是递归的意思]



## 请教师傅的问题

流年  11:54:07  
宿主机和虚拟机有什么不同?为什么先传压缩文件到宿主机,再从宿主机传到虚拟机?

师傅  11:55:38  
因为你不能直接连到虚拟机,虚拟机的ip是172.20.1.1 是内网ip你又没vpn怎么连,宿主机有外网ip你可以访问,我们平时访问是访问宿主机，反向代理到虚拟机


## 理解一下

就像章也姐姐传文件到我电脑里的虚拟机，只能先把文件传到我的电脑上，然后我再把文件传到虚拟机里。章也姐姐不能直接绕过我把文件传到我的虚拟机里。还有若要登录我的电脑中的虚拟机，我必须先登录本机。

## 命令说明
git archive 用来方便的将git repo某个快照打包。  
打包成gzip：git archive master --prefix='project/' | gzip > project.tar.gz    
打包成zip：git archive master --prefix='project/' --format=zip > project.zip    
打包成tar：git archive master --prefix='project/' --format=tar > project.tar    
master可用任何一个branch或者commitId替换。


## 很棒的linux命令查询网站
[访问](http://man.linuxde.net/)
