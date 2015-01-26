---
layout: post
title: atom-shell
category: 技术
tags: Atom
description: 桌面应用(运行在桌面的网页)
---

## 杂记
1. Asar: 一种压缩格式,支持随机访问,用json格式存储文件信息,方便写解析器   
2. atom-shell有两套API，nodeJs提供的Node API和Chromium提供的Web API.
3. 
	
		var app = require('app');  
    	var BrowserWindow = require('browser-window');
	
		var window = null;

		app.on('ready', function() {
  			window = new BrowserWindow({width: 800, height: 600});	
 			window.loadUrl('https://github.com');  //注意桌面窗口可以看见github官网
		});
	
4. Render Process 隔离与通信:Browser Process和 Render Process是atom shell中两个分开的概念(多线程?)。开发者的main.js脚本执行的环境，就是Browser Process，而每个Browser Window，则是一个个Render Process。官方列举的Module就有大部分只能在 Browser Process 下面的才能直接 Require。详情[访问](http://blog.iwege.com/posts/atom-shell-vs-node-webkit.html)
5. atom-shell调用jquery:
	
	
	
		//不能使用script标签
	 	window.$ = window.jQuery = require('./assets/js/jquery.min.js');
6. 调试: 跟chrome里一样，用快捷键好了option+command+i


## 模块
### 浏览器端模块
#### app模块
该应用程序模块负责控制程序的运行时间。    

1. Event: will-finish-launching:在程序启动(初始化)后触发(跟ready事件一样)。可以在这里监听open-file和open-url事件，启动崩溃报告和自动更新。  

2. Event: window-all-closed:所有**窗口**被**关闭**时触发(注意此时一定是应用程序还没有退出)

3. Event: will-quit:应用**程序退出**时触发。

4. Event: open-file:


### 网页模块
#### ipc(renderer)模块
ipc模块提供一系列向浏览器发送同步和异步消息的方法，同时可以接收来自浏览器端的信息。如果你想在渲染进程中使用浏览器进程的模块，你应该考虑使用remote(远程)模块。  
   
1. ipc.send(channel[, args...]):异步发送消息到网页，浏览器进程可通过监听IPC模块的通道事件进行处理。    
2. ipc.sendSync(channel[, args...]):同步发送消息到网页并通过设置event.returnValue返回结果。**注意尽量不要使用这个API,因为同步消息会阻塞整个网页**。  
3. ipc.sendToHost(channel[, args...]):与ipc.send差不多(异步)。但是消息会发送到整个网页而不仅是浏览器进程。sendToHost主要用于webview与网页的通信。

#### remote模块
远程模块提供了一种简单的方法来做到的渲染进程和浏览器进程间的通信。

1. 在atom-shell中,只有与用户图形界面相关的模块可以在渲染进程中使用。如果没有remote模块，用户若想要在渲染进程中调用浏览器端的API就必须向浏览器进程准确的发送进程间信息,一旦有了remote模块，用户就可以直接使用浏览器对像所有的方法，而不需要任何进程间的通信(实际上在使用remote方法或对象时已经同步的发送了进程间通信的信息)。
		
		
		
	
		<script type="text/javascript">
			<!--直接在当前窗口中打开另一个窗口-->
  			var remote = require('remote');
			var BrowserWindow = remote.require('browser-window');
			var win = new BrowserWindow({ width: 800, height: 600 });
			win.loadUrl('https://github.com');
  		</script>

2. 远程对象的生命周期: Atom-shell没有对**渲染进程**中的远程对象使用垃圾回收机制，也就是说渲染进程中的远程对象会一直存在，并且在浏览器进程中相应的对象也不会被释放。一旦渲染进程中的远程对象被回收了，浏览器进程中的相应对象即取消引用。需要注意的是如果渲染进程中的远程对象泄露，将会导致浏览器进程中相应的对象泄露。
3. 浏览器回调: remote模块支持回调，但是有一些注意事项:  
 
 	- 为了避免死锁，传递到浏览器进程中的回调必须是异步的，所以你不应该指望通过浏览器进程去获取回调函数返回的值  
 	- 传递到浏览器进程中的回调函数一旦被调用后不会自动释放。相反的直到浏览器进程被垃圾回收后才会被释放。
 	- 尽量避免传递回调函数到浏览器进程中。
 	
	
 	- remote.require(module)：返回浏览器进程返回的对象
 	- remote.getCurrentWindow()：返回表示当前窗口的BrowserWindow对象
 	- remote.getGlobal(name): 返回浏览器进程的全局变量
 
#### web-frame模块
这个模块可以渲染当前的网页
	
1. webFrame.setZoomFactor(factor): 改变缩放因子指定的系数，变焦放大倍数为百分之100，所以300％=3.0。(缩放网页)
	
	
		var webFrame = require('web-frame');
		webFrame.setZoomFactor(2); 
2. webFrame.getZoomFactor()：获取当前的缩放因子
3. webFrame.setZoomLevel(level)
4. webFrame.getZoomLevel()
5. webFrame.setSpellCheckProvider(language, autoCorrectWord, provider)：输入框或文本域的拼写检查


### 公用模块
#### clipboard模块
剪贴板模块提供复制黏贴操作方法

#### crash-reporter崩溃报告模块
示例:

	crashReporter = require('crash-reporter');
	crashReporter.start({
  		productName: 'YourName',
  		companyName: 'YourCompany',
  		submitUrl: 'https://your-domain.com/url-to-submit',
  		autoSubmit: true
	});

1. crashReporter.start(options)
2. crashReporter.getLastCrashReport()
3. crash-reporter payload

#### screen模块
获取有关屏幕尺寸，显示器，光标位置的各种信息(一定要在ready事件及app模块初始化后使用本模块)

1. Event: display-added
2. Event: display-removed
3. Event: display-metrics-changed
4. screen.getCursorScreenPoint()
5. screen.getPrimaryDisplay()
6. screen.getAllDisplays()
7. screen.getDisplayNearestPoint(point)
8. screen.getDisplayMatching(rect)

#### shell模块



## 打包
	npm install -g asar
	asar pack your-app app.asar
	
	//可以查看打包成.asar的文件包含了哪些文件
	asar list /path/to/example.asar
	