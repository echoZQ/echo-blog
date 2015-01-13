---
layout: post
title: javascript事件机制相关
category: 技术
tags: Javascript
description: 感觉自己的状态不好，看了网上那么多的前端面试题和大牛们的博客，感觉自己真的太弱了。近来心不静,公司事情不多,一停下来居然有点手足无措。反思一下自己及工作现状，遇到的问题基本能独立解决，慢慢的少了当初的斗志和新鲜感。自觉像一只深井里的青蛙，井水尼玛还是温的。。。然后想说是不是该换个环境出去看看这个世界，看看自己身上的局限，看看自己需要做哪些更多的努力。闲暇时逛一些大牛的博客，发现自己的基础太不扎实，学的杂但是没有深度。也许接下来应该把重心挪到前端学习的深度上来。 
---

## javascript注册事件两种方式
addEventListener: 符合W3C规范的事件绑定方法，FireFox、Chrome、Safari都是用它来绑定事件。  
attachEvent: IE私有，不符合W3C规范，而且在IE下，只能使用它来绑定事件，addEventListener是无效的。  
所以绑定事件必须考虑浏览器的兼容性问题。

### addEventListener
element.addEventListener(type,listener,useCapture);   
type: 不带on前缀  
listener: 不能加括号**只能**写函数名！！！  
useCapture: true or false;true表示用capture(捕获)方式,false表示用bubbling(冒泡)方式进行事件监听。

下面上一个示例记录一下两种事件监听方式的不同。	

<html>
<head>
	<meta charset="utf-8" />
	<title>js事件机制</title>
	<style type="text/css">
	#red {
		box-sizing: border-box;
		background: red;
		width: 100px;
		height: 100px;
		padding-top: 25px; 
		cursor: pointer;
	}
	#blue {
		margin-top: 25px;
		background: blue;
		width: 50px;
		height: 50px;
		margin: auto;
		cursor: pointer;
	}
	</style>
</head>
<body>
<div id="red">
	<div id="blue">
	</div>
</div>
</body>
</html>

如上图所示,红色区域包含蓝色区域。分别为红色区域和蓝色区域注册了点击事件。  
	
	<script type="text/javascript">
	window.onload = function () {
		function clickRed() {
			alert("点击了红色区块");
		};
		function clickBule() {
			alert("点击了蓝色区块");
		};
		document.getElementById('red').addEventListener("click", clickRed, false);
		document.getElementById('blue').addEventListener("click", clickBule, false);
	}
	</script>

当useCapture参数都设置为false时: 点击蓝色区域，先提示“点击了蓝色区块”再提示点击了红色区块。这就是所谓的冒泡模式(由内而外)。  
当useCapture参数都设置为true时: 点击蓝色区域，先提示“点击了红色区块”再提示点击了蓝色区块。这就是所谓的捕获模式(由外而内)。  
当useCapture参数一个设置为true一个设置为false时: 先找捕获模式事件再找冒泡事件。即如果:
	
	//先弹“点击蓝色区块“再弹“点击红色区块“
	document.getElementById('red').addEventListener("click", clickRed, false);
	document.getElementById('blue').addEventListener("click", clickBule, true);
	
### attachEvent
element.attachEvent(type,listener);  
type: 注意事件前面要带on  
listener: 不能加括号**只能**写函数名！！！   

可以看到attachEvent事件没有useCapture这个参数，那是因为IE只支持事件冒泡不支持事件捕获

### element.onclick
平时写代码的时候 element.onclick = function() {};的写法很多,那如果我们将代码改成这样:
	
	//先弹“点击蓝色区块“再弹“点击红色区块“,即冒泡事件
	document.getElementById('red').onclick = clickRed;
    document.getElementById('red').onclick = clickBule;
### 关于对一个元素绑定多个事件
如果用addEventListener绑定事件:

	//先弹出"1"再弹出"2"
	document.getElementById('red').addEventListener("click", function () {
			alert("1");
	}, false);
	document.getElementById('red').addEventListener("click", function () {
		alert("2");
	}, false);

那如果用attachEvent绑定事件:

	//先弹出“2”再弹出“1”   %>_<%傻了居然在chrome里运行attachEvent方式==
	document.getElementById('red').attachEvent("onclick", function () {
		alert("1");
	});
	document.getElementById('red').attachEvent("onclick", function() {
		alert("2");
	});
	
### 冒泡事件阻止
在w3c中我们使用e.stopPropagation();  
在IE下面，我们设置window.event.cancelBubble = true;  
阻止事件的默认行为，例如click,a的跳转  
在w3c中，使用e.preventDefault()方法;  
在IE下设置window.event.returnvalue = false;


### 总结一下
1. IE只支持事件冒泡不支持事件捕获,也不支持addEventListener函数;
2. element.onclick  = doSth; 这种绑定方式用的是事件冒泡;
3. 一个元素绑定多个事件时: 用addEventListener是先绑定先执行，而attachEvent使先绑定后执行
4. 阻止冒泡事件e.stopPropagation();阻止事件默认行为e.preventDefault();


参考链接[访问](http://www.cnblogs.com/yexiaochai/p/3477715.html)  
参考链接[访问](http://www.cnblogs.com/hustskyking/p/problem-javascript-event.html)
