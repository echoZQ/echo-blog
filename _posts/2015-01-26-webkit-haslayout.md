---
layout: post
title: js引发的haslayout问题
category: 技术
tags: Css Javascript
description: 目前为止遇到的最匪夷所思的bug
---

## 起因
建行公众号内嵌的充值页面，在三星Note3,三星S5以及Nexus下无法切换产品。

## 解决
话费及流量产品是根据手机号动态添加的，在上述手机中option无法正常点击切换。开始想使用的方法是js重新添加元素后重新绑定change事件，但是有个非常奇怪的现象。
	
	var index = $('#select_id').get(0).selectedIndex;
	$('#select_id option:eq(' + index + ')').attr("selected", "selected");
	
上面的写法是无法达到切换效果的，但是如果index的值写死就可以成功切换。问题是测试过index的type就是num,且“#select_id option:eq(' + index + ')“的值也没有错，简直无解 %>_<%。

## 最终方案
张鑫旭最近的博文[访问](http://www.zhangxinxu.com/wordpress/2015/01/chrome-absolute-display-visibility-render-bug/)里提到了haslayout触发,在js动态添加option后，使用-webkit-transform: translateZ(0)很好的解决了这个渲染bug。

## 页面重绘,回流相关
google的时候看到了这篇博文[访问](http://www.blogjava.net/BearRui/archive/2010/05/10/320502.html)

### 浏览器页面呈现流程

![浏览器对页面的处理流程](/Users/zhaoqian/echo-blog/public/img/2015-01-26-render-tree.png)

1. 浏览器把获取到的html代码解析成1个Dom树，html中的每个tag都是Dom树中的1个节点，根节点就是我们常用的document对象(注意不是\<body>而是\<html>)。dom树里面包含了所有的html tag,**包括display:none隐藏**，还有用JS动态添加的元素等。

2. 浏览器把所有样式(主要包括css和浏览器的样式设置)解析成样式结构体，在解析的过程中会**去掉浏览器不能识别的样式**，比如IE会去掉-moz开头的样式，而firefox会去掉_开头的样式。

3. dom tree和样式结构体结合后构建呈现树(render tree),render tree有点类似于dom tree，但其实区别有很大，**render tree能识别样式**，render tree中每个node都有自己的style，而且**render tree不包含隐藏的节点(比如display:none的节点，还有head节点)**，因为这些节点不会用于呈现，而且不会影响呈现的，所以就不会包含到render tree中。注意 **visibility:hidden隐藏的元素还是会包含到render tree中的，因为visibility:hidden 会影响布局(layout)(visibility: hidden和display: none很大的一个差别)，会占有空间**。

4. 一旦render tree构建完毕后，浏览器就可以根据render tree来绘制页面了。

### 回流与重绘
**回流必将引起重绘，而重绘不一定会引起回流。**

1. 当render tree中的一部分(或全部)因为元素的**尺寸，布局，隐藏**等改变而需要重新构建。这就称为回流(重新布局)。每个页面至少需要一次回流，就是在页面第一次加载的时候。

2. 当render tree中的一些元素需要更新属性，而这些属性只是影响元素的外观，风格，而**不会影响布局**的，比如background-color。则就叫称为重绘。

### 什么会影响页面重绘和回流

(是否有影响到页面的布局)
其实任何对render tree中元素的操作都会引起回流或者重绘，比如：

    1. 添加、删除元素(回流+重绘)

    2. 隐藏元素，display:none(回流+重绘)，visibility:hidden(只重绘，不回流)

    3. 移动元素，比如改变top,left(jquery的animate方法就是,改变top,left不一定会影响回流)，或者移动元素到另外1个父元素中。(重绘+回流)

    4. 对style的操作(对不同的属性操作，影响不一样)

    5. 还有一种是用户的操作，比如改变浏览器大小，改变浏览器的字体大小等(回流+重绘)


### 如何减少回流和重绘
其实就是减少对render tree的操作。具体方法有:

1. 不要一个个改变元素样式,可以直接改变className。或者像jquery里.css方法直接传对象好了。

2. 让要操作的元素进行"离线处理"，处理完后一起更新，这里所谓的"离线处理"即让元素不存在于render tree中，比如 

	 a) 使用documentFragment或div等元素进行缓存操作，这个主要用于添加元素的时候，大家应该都用过，就是先把所有要添加到元素添加到1个div(这个div也是新加的)，最后才把这个div append到body中(\<script type="template">\</script>也一样？)。  
	 
     b) 先display:none 隐藏元素，然后对该元素进行所有的操作，最后再显示该元素。因对display:none的元素进行操作不会引起回流、重绘。所以所有操作只会有2次回流。
 
3. 不要经常访问会引起浏览器flush队列的属性，如果你确实要访问，就先读取到变量中进行缓存，以后用的时候直接读取变量就可以了
	
	
		// 别这样写
		for(循环) {
    		el.style.left = el.offsetLeft + 5 + "px";
    		el.style.top  = el.offsetTop  + 5 + "px";
		}

		// 这样写好点  
		var left = el.offsetLeft,top  = el.offsetTop,s = el.style;
		for(循环) {
    		left += 10;
    		top  += 10;
    		s.left = left + "px";
    		s.top  = top  + "px";
		}
		
4. 考虑你的操作会影响到render tree中的多少节点以及影响的方式，影响越多，花费肯定就越多.

## 参考链接
[Chrome absolute绝对定位display/visibility渲染bug](http://www.zhangxinxu.com/wordpress/2015/01/chrome-absolute-display-visibility-render-bug/)  
[页面呈现，回流与重绘](http://www.blogjava.net/BearRui/archive/2010/05/10/320502.html)


