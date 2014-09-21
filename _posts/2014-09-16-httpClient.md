---
layout: post
title: httpClient及跨域相关
category: 技术
tags: Http
description: 为解决跨域问题
---
### 起因
微信公众号自定义菜单时,需要调用如下接口：

http请求方式：POST（请使用https协议） https://api.weixin.qq.com/cgi-bin/menu/create?access_token=ACCESS_TOKEN

请求示例

 	{
    	 "button":[
     	{	
          	"type":"click",
          	"name":"今日歌曲",
            "key":"V1001_TODAY_MUSIC"
     	 },
      	{
           	"type":"click",
           	"name":"歌手简介",
           	"key":"V1001_TODAY_SINGER"
      	},
      	{
          	"name":"菜单",
           	"sub_button":[
           	{	
              "type":"view",
              "name":"搜索",
              "url":"http://www.soso.com/"
            },
            {
               "type":"view",
               "name":"视频",
               "url":"http://v.qq.com/"
            },
            {
               "type":"click",
               "name":"赞一下我们",
               "key":"V1001_GOOD"
            }]
       }]
 	}
 
 如果使用ajax去调用该接口，那么就碰到了跨域到问题。
 
### ajax两个问题
第一个是AJAX以何种格式来交换数据？第二个是跨域的需求如何解决？

JSON是一种数据交换格式，而JSONP是一种依靠开发人员的非官方跨域数据交互协议。一个是描述信息的格式，一个是信息传递双方约定的方法。

## 什么是jsonP
jsonp的核心则是**动态添加script标签**来调用服务器提供的js脚本。

### jsonP的产生
1.Ajax直接请求普通文件存在跨域无权限访问的问题，甭管你是静态页面、动态网页、web服务、WCF，只要是跨域请求，一律不准；

2.Web页面上调用js文件时则不受是否跨域的影响（不仅如此，我们还发现凡是拥有"src"这个属性的标签都拥有跨域的能力，比如script、img、iframe）;

3.如果想通过纯web端（ActiveX控件、服务端代理、属于未来的HTML5之Websocket等方式不算）跨域访问数据就只有一种可能，那就是在远程服务器上设法**把数据装进js格式的文件里**，供客户端调用和进一步处理；

4.我们已经知道有一种叫做JSON的纯字符数据格式可以简洁的描述复杂数据，更妙的是JSON还被js原生支持，所以在客户端几乎可以随心所欲的处理这种格式的数据；

5.web客户端通过与调用脚本一模一样的方式，来调用跨域服务器上动态生成的js格式文件（一般以JSON为后缀），显而易见，服务器之所以要动态生成JSON文件，目的就在于把客户端需要的数据装入进去。

6.客户端在对JSON文件调用成功之后，也就获得了自己所需的数据，剩下的就是按照自己需求进行处理和展现了，这种获取远程数据的方式看起来非常像AJAX，但其实并不一样。

7.为了便于客户端使用数据，逐渐形成了一种**非正式传输协议**，人们把它称作JSONP，该协议的一个要点就是**允许用户传递一个callback参数给服务端**，然后服务端返回数据时会将这个callback参数作为**函数名**来包裹住JSON数据，这样客户端就可以随意定制自己的函数来自动处理返回数据了。//它返回的就是一段javascript代码

### jsonP的客户端实现

1、我们知道，哪怕跨域js文件中的代码(当然指符合web脚本安全策略的),web页面也是可以无条件执行的。

远程服务器remoteserver.com根目录下有个remote.js文件代码如下：

	alert('我是远程文件');
本地服务器localserver.com下有个jsonp.html页面代码如下：

	<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/	xhtml1/DTD/xhtml1-transitional.dtd">
	<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
    	<title></title>
    	<script type="text/javascript" src="http://remoteserver.com/remote.js"></script>
	</head>
	<body>

	</body>
	</html>
毫无疑问，页面将会弹出一个提示窗体，显示跨域调用成功。

2、现在我们在jsonp.html页面定义一个函数，然后在远程remote.js中传入数据进行调用。

jsonp.html页面代码如下：

	<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/	xhtml1/DTD/xhtml1-transitional.dtd">
	<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
   		<title></title>
    	<script type="text/javascript">
    	var localHandler = function(data){
        	alert('我是本地函数，可以被跨域的remote.js文件调用，远程js带来的数据是：' + data.result);
    	};
    	</script>
    	<script type="text/javascript" src="http://remoteserver.com/remote.js"></script>
	</head>
	<body>

	</body>
	</html>

remote.js文件代码如下：

	localHandler({"result":"我是远程js带来的数据"});
运行之后查看结果，页面成功弹出提示窗口，显示本地函数被跨域的远程js调用成功，并且还接收到了远程js带来的数据。跨域远程获取数据的目的基本实现了，但是又一个问题出现了，我怎么让远程js知道它应该调用的本地函数叫什么名字呢.

3、聪明的开发者很容易想到，只要服务端提供的js脚本是动态生成的就行了呗，这样调用者可以传一个参数过去告诉服务端“我想要一段调用XXX函数的js代码，请你返回给我”，于是服务器就可以按照客户端的需求来生成js脚本并响应了。

看jsonp.html页面的代码：

	<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/	xhtml1/DTD/xhtml1-transitional.dtd">
	<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
    	<title></title>
    	<script type="text/javascript">
    	// 得到航班信息查询结果后的回调函数
   		 var flightHandler = function(data){
        	alert('你查询的航班结果是：票价 ' + data.price + ' 元，' + '余票 ' + data.tickets + ' 	张。');
    	};
    	// 提供jsonp服务的url地址（不管是什么类型的地址，最终生成的返回值都是一段javascript代码）
   		 var url = "http://flightQuery.com/jsonp/flightResult.aspx?	code=CA1998&callback=flightHandler";
    	// 创建script标签，设置其属性
   		 var script = document.createElement('script');
   		 script.setAttribute('src', url);
   		// 把script标签加入head，此时调用开始
    	document.getElementsByTagName('head')[0].appendChild(script); 
   		 </script>
	</head>
	<body>
	</body>
	</html>

这次的代码变化比较大，不再直接把远程js文件写死，而是编码实现动态查询，而这也正是**jsonp客户端实现的核心部分**，本例中的重点也就在于如何完成jsonp调用的全过程。

我们看到调用的url中传递了一个code参数，告诉服务器我要查的是CA1998次航班的信息，而callback参数则告诉服务器，我的本地回调函数叫做flightHandler，所以请把查询结果传入这个函数中进行调用。

OK，服务器很聪明，这个叫做flightResult.aspx的页面生成了一段这样的代码提供给jsonp.html（服务端的实现这里就不演示了，与你选用的语言无关，说到底就是拼接字符串）：

	flightHandler({
    	"code": "CA1998",
    	"price": 1780,
   		"tickets": 5
	});
我们看到，传递给flightHandler函数的是一个json，它描述了航班的基本信息。运行一下页面，成功弹出提示窗口，jsonp的执行全过程顺利完成

4、jQuery如何实现jsonp调用（我们依然沿用上面那个航班信息查询的例子，假定返回jsonp结果不变）：


	<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/	xhtml1/DTD/xhtml1-transitional.dtd">
 	<html xmlns="http://www.w3.org/1999/xhtml" >
	 <head>
     	<title>Untitled Page</title>
      	<script type="text/javascript" src=jquery.min.js"></script>
      	<script type="text/javascript">
     	jQuery(document).ready(function(){ 
        	$.ajax({
             	type: "get",
             	async: false,
             	url: "http://flightQuery.com/jsonp/flightResult.aspx?code=CA1998",
             		dataType: "jsonp",
           		jsonp: "callback",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(一般默认	为:callback)
             	jsonpCallback:"flightHandler",//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名，也可以写"?"，jQuery会自动为你处理数据
             	success: function(json){
                 	alert('您查询到航班信息：票价： ' + json.price + ' 元，余票： ' + json.tickets + ' 张。');
            	 },
            	 error: function(){
                 	alert('fail');
             	}
         	});
     	});
     	</script>
     	</head>
  	<body>
  	</body>
 	</html>
 	
### jsonP主要点
不管是否跨域，只要用jsonp方式就只能是get，因为本质是script方式加载的。

之前使用jsonP做post提交时，发现数据实际还是以get方式提交，且无法传递请求数据。

### httpCient
如上关于jsonP的分析可以知道，我想用ajax实现post跨域提交是不行了(貌似是可以实现的但是很复杂)

HttpClient是一个客户端的HTTP通信实现库。HttpClient的目标是发送和接收HTTP报文。HttpClient不会去缓存内容，执行嵌入在HTML页面中的javascript代码，猜测内容类型，重新格式化请求/重定向URI，或者其它和HTTP运输无关的功能。


jsonP相关[访问](http://www.cnblogs.com/dowinning/archive/2012/04/19/json-jsonp-jquery.html)



 
 