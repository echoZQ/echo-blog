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

### 事件委托
首先我目前的事件都是一个个绑定的。这种做法的问题是:增加内存,降低了代码性能。  
事件委托利用了**事件冒泡**，只指定一个事件处理程序，就可以管理某一类型的所有事件。例如，click事件会一直冒泡到document层次。也就是说，我们可以为整个页面指定一个onclick事件处理程序，而不必给每个可单击的元素分别添加事件处理程序。

下面的例子是给每个li绑定事件:
<html>
	<head>
		<meta charset="utf-8">
		<title>js事件委托</title>
		<style type="text/css">
			#showList {
				list-style-type: none;
				padding: 0;
			}
			#showList li {
				display: inline-block;
				border: 3px solid pink;
				cursor: pointer;
			}
		</style>
	</head>
	<body>
		<ul id="showList">
			<li id="apple">apple</li>
			<li id="orange">orange</li>
			<li id="banana">banana</li>
		</ul>
	</body>
</html>

#### 一个个绑定
	
		<script type="text/javascript">
			window.onload = function () {
				//原始写法
				var apple = document.getElementById('apple');
				var orange = document.getElementById('orange');
				var banana = document.getElementById('banana');
				function clickApple () {
					alert("apple");
				}
				function clickOrange () {
					alert("orange");
				}
				function clickBanana () {
					alert("banana");
				}
				
				addHandle(apple, "click", clickApple, false);
				addHandle(orange, "click", clickOrange, false);
				addHandle(banana, "click", clickBanana, false);
				
				function addHandle (target, e, fun, flag) {
					//判断浏览器
					if (typeof window.addEventListener === 'function') {
						//chrome等
						target.addEventListener(e, fun, flag);
					} else {
						//IE
						target.attachEvent(e,fun);
					}
				}
			}
		</script>
如果一个个绑定，那万一我们有几十上百个li需要绑定,那就悲剧了==

#### 采用事件委托
把事件监听器添加到父元素上，避免对特定的每个节点添加事件监听器。

注：由于mac上IE没有的问题，与attachEvent事件相关的事实上没有测试。

	//原理:事件委托只为<ul>元素添加了一个onclick事件处理程序，由于所有列表项都是这个元素的子节点，而且它们的事件会冒泡，所以单击事件最终会被这个函数处理
	<script type="text/javascript">
		window.onload = function () {
			//事件委托
			var showList = document.getElementById('showList');
			addHandle(showList, "click", bindEvent, false);
			
			function bindEvent () {	
			$target = event.target;
				switch ($target.id) {
					case "apple": 
						alert("I'm apple");
						break;
					case "orange": 	
						alert("I'm orange");
						break;
					case "banana": 
						alert("I'm banana");
						break;
					default: 
						break;
					}
				}

			function addHandle (target, e, fun, flag) {
				//判断浏览器
				if (typeof window.addEventListener === 'function') {
					//chrome等
					target.addEventListener(e, fun, flag);
				} else {
					//IE
					target.attachEvent(e,fun);
				}
			}
		}
	</script>

采用事件委托的方式，只需要获取一个dom元素只添加一个事件处理程序。这么做占用内存更少,多数鼠标及键盘事件都可采用事件委托的方式。  
最适合采用事件委托技术的事件包括click,mousedown,mouseup,keydown,keyup和keypress,虽然mouseover和mouseout事件也冒泡，但要适当处理它们并不容易，而且经常需要计算元素的位置（因为当鼠标从一个元素移到其他子节点时，或者当鼠标移出该元素时，都会触发mouseout事件）。

#### jquery事件绑定的实现原理
	
	//所以这种事件绑定方式相当于一个个元素绑定过去,弊端在于，增加了内存，因为$(’#data-list li’)里有100个li对象。同时降低了代码性能，因为$(’#data-list li’)会搜索ul#data-list下所有的li元素。
	$('#showList li').on("click", function () {
		alert($(this).text());
	})
	
	//这个就是事件委托了
	$('#showList').on("click", "li", function () {
		alert($(this).text());
	});
	
**除了提高性能和节省内存的好处外，事件委托的另一个好处在于，页面动态变化后，不需要重新检索元素和绑定事件。上例中，如果通过AJAX向列表增加新项，新添加项仍能响应用户点击。**	

### 总结一下
1. IE只支持事件冒泡不支持事件捕获,也不支持addEventListener函数;
2. element.onclick  = doSth; 这种绑定方式用的是事件冒泡;
3. 一个元素绑定多个事件时: 用addEventListener是先绑定先执行，而attachEvent使先绑定后执行;
4. 阻止冒泡事件e.stopPropagation();阻止事件默认行为e.preventDefault();
5. 不是所有事件都支持冒泡的,键盘及鼠标事件支持。
6. 事件委托就是利用事件冒泡的特性，当内层元素的某个事件被触发，事件会一级一级冒泡到更外层元素，所以必定会触发外层元素绑定的事件。


参考链接[访问](http://www.cnblogs.com/yexiaochai/p/3477715.html)  
参考链接[访问](http://www.cnblogs.com/hustskyking/p/problem-javascript-event.html)  
参考链接[访问](http://www.html5china.com/js/jsadv/20111120_2737.html)
