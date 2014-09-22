---
layout: post
title: seaJs
category: 技术
tags: js
description: seaJs
---
之前使用过requireJs做模块化开发,用的不是很好。看看seaJs和requireJs有什么不同。

### AMD(异步模块定义)和CMD(通用模块定义)规范的不同

区别：

1.对于依赖的模块，AMD是提前执行，CMD是延迟执行。CMD推崇as lazy as possible.

2.CMD 推崇依赖就近，AMD 推崇依赖前置。看代码：

	define(function(require, exports, module) {
		var a = require('./a');
		a.doSomething()
		// 此处略去 100 行
		var b = require('./b'); // 依赖可以就近书写
		b.doSomething()
		// ... 
	})
如:
		
	define(function(require, exports, module) {
		var $ = require('jquery');
		var _ = require('underscore');
	})
	
AMD 默认推荐的是

	define(['./a', './b'], function(a, b) { // 依赖必须一开始就写好
		a.doSomething()
		// 此处略去 100 行
		b.doSomething()
		//...
	}) 
如:
		
	define(['jquery', 'underscore'], function($, _) {
		$.ajax();
		_.map();
	})

3.AMD的API默认是一个当多个用，CMD的API严格区分，推崇职责单一。比如 AMD 里，require分全局require和局部require，都叫 require。CMD 里，没有全局 require，而是根据模块系统的完备性，提供 seajs.use 来实现模块系统的加载启动。CMD里每个API都简单纯粹。

玉伯:
AMD和CMD表面上的区别是书写格式不同。
AMD下，默认推荐的模块格式是

	define(['a','b'], function(a, b) {
 	 	// do sth
	})
CMD里，默认推荐的是

	define(function(require, exports, module) {
  		var a = require('a')
  		var b = require('b')
  		// do sth
 		 ...
	})
目前越来越意识到，默认推荐的模式书写格式表面上的不同，背后带来的差异越来越有意思。
其中一个核心差异是:就近原则
AMD 中的依赖通过函数参数传入，带来的好处是一个模块的依赖直接在头部一目了然，非常清晰。带来的不足是，AMD下其实默认推荐了var 在一起的写法，比如

	var a = 1, b = 2,  long long ...
	// do sth A
	// do sth B
	
CMD 书写风格下，导向的是就近原则（变量在需要它的地方之前才定义）：

	var a = 1
	// do sth A

	var b = 2
	// do sth B
还有一个核心差异也跟就近原则有关，是懒原则
在AMD里

	define(['a', 'b'], function(a, b) {
   	//模块a和b在这里就都执行好并可用了
	})
在 CMD 里

	define(function(require, exports) {
   	// ...
   	var a = require('a')  // 模块 a 运行到此处才执行
	// ...
    if (false) {
    var b = require('b')   // 当某些条件为false时，模块b永远也不会执行
   	}
	})
CMD 更懒。
个人觉得 AMD 和 CMD 的核心差异体现在 对自然的追求上。
何为自然？CMD 认为就近原则书写代码更自然，AMD则觉得提前都写好更自然。
何为自然？CMD 认为需要时才执行更自然，AMD觉得依赖就应该提前都执行好，这样才自然。

### 玉伯有句话-RequireJS是没有明显的bug，SeaJS是明显没有bug
有篇博文蛮有意思的[访问](http://www.douban.com/note/283566440/)

### uglify

师傅说uglify对requireJs没有影响，但是对seaJs是致命的，因为seaJs用的是正则表达式,所以使用seaJs时，应该使用spmJs压缩。其中spmJs主要做了三件事:
	
	①使seaJs可以压缩
	②将js文件合并到一起去从而减少了http请求
	③uglify减少请求的字节数。


