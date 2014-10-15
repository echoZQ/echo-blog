---
layout: post
title: 随手记点
category: 备忘
description: 一些零散的知识点
---
### php @
	
	见到@array['']这种写法，@无论加在数组前还是方法前都可以隐藏所有错误信息，但是错误还是不该被隐藏。
    
### 关于mysql orderBy
流量购后台当初做充值监控的时候，直接把数据取出来然后做循环累加！！！然后被吐槽死！！！事实上只需按时间orderBy即可。数据库内存储的是普通时间，即如:2014-09-28 06:36:36

	//按小时分组
	group by date_format(`t`.`create_time`, '%Y-%m-%d %H')
	//按日分组
	group by date_format(`t`.`create_time`, '%Y-%m-%d')
	//按月分组
	group by date_format(`t`.`create_time`, '%Y-%m')
	
代码优化后明显感觉查询速度快了很多！！！不要挖坑啊~
