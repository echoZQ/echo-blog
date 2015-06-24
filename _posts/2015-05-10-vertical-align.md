---
layout: post
title: vertical-align属性
category: 备忘
tags: Css
description: 因为基础的关系，面试的时候已经被秒很多次了==不管是css还是js，水深了去了。要警觉，要先学走再学跑学跳
---

## 起因

&emsp;&emsp;最近被问到vertical-align有多少属性，只能举出工作中常用的，查了一下发现属性好多。

&emsp;&emsp;然后基础被秒==，太弱了==，还有种六级白过了的赶脚==

&emsp;&emsp;还有一点，发现公司有两种，一种是拉进去能干活就行的，一种是很看重基础(不要埋坑的么😂)，比如只会用框架原生js了解泛泛的真心跪了==

## 关于vertical-align

&emsp;&emsp;w3c上说明vertical-align的属性有一下几个:详细的说明还是看例子里的吧。

	vertical-align: baseline | sub | super | top | text-top | middle | bottom | text-bottom | % | inherit | 数值

&emsp;&emsp;上周看到了codepen这个工具，试了一把还蛮好用的。例子在这里<a href="http://codepen.io/echoZQ/pen/mJVmRV" target="_blank">访问</a>

&emsp;&emsp;例子里面看出的几个问题如下:
	
1. top、middle、baseline、bottom这四个属性是怎么来的?

2. 文本的上标和下标什么意思?原本将我的女侠头像放的一样大，看不出来，发现缩小后,上标和下标的意思就比较明显了，角标的意思吧

3. top和text-top,bottom和text-bottom看起来好像一毛一样?

4. 百分比的那个属性是按什么算的?'0%'等同于'baseline'。但是这个百分比增大或者缩小整个图片像在上下震动。不甚理解。

5. 数值那个属性是怎么算的？通过距离升高（正值）或降低（负值）元素。'0cm'等同于'baseline'，所以我可以看到图11和图1是一样一样的。



### 行高
&emsp;&emsp;看了一些博文，vertical-align与line-height好像有密不可分的关系，首先我得了解一下什么叫行高。可耻的盗图一张:
![css中的行高](/echo-blog/public/img/o_line_height.png)

&emsp;&emsp;行高跟四条线有关，顶线，中线，基线(一般在文字底部四分之一的地方)和底线。
	
&emsp;&emsp;行高:指两行文字基线之间的距离(那么问题来了，一行文字怎么算行高?)；

&emsp;&emsp;行距:（行高-字体尺寸）/ 2 所以文本之间的行距是受行高及字体大小影响的

&emsp;&emsp;现在我可以看看上面的问题
	
1. 问题1：四个属性看起来找到对应的关系了，line-height的四条线。但是这四条线具体是怎么分的?而且图片内容已经将行高撑开了?

2. 问题2：关于text-top，看了张鑫旭<a href="http://www.zhangxinxu.com/wordpress/2010/06/css-vertical-align%E7%9A%84%E6%B7%B1%E5%85%A5%E7%90%86%E8%A7%A3%EF%BC%88%E4%BA%8C%EF%BC%89%E4%B9%8Btext-top%E7%AF%87/">css-vertical-align的深入理解（二）之text-top篇/</a>后发现这个问题深了去了，下面应该去看看行内框及line-height相关的一些内容了==

## 参考链接
张鑫旭大神写了很多这方面的博文
[访问](http://www.cnblogs.com/rainman/archive/2011/08/05/2128068.html)
[访问](http://www.zhangxinxu.com/wordpress/2009/11/css%E8%A1%8C%E9%AB%98line-height%E7%9A%84%E4%B8%80%E4%BA%9B%E6%B7%B1%E5%85%A5%E7%90%86%E8%A7%A3%E5%8F%8A%E5%BA%94%E7%94%A8/)

  
  