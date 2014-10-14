---
layout: post
title: 微信红包项目相关总结
category: 总结
tags: Css Zepto 
description: 第一次接触移动端开发,感觉蛮好玩哒
---

### zepto
做移动端，jquery框架显得太过庞大，而Zepto只针对移动端浏览器编写，因此体积更小、效率更高。

zepto使用过程中的一些注意点:
[访问](http://chaoskeh.com/blog/some-experience-of-using-zepto.html)

### WAP网站上输入框的默认键盘类型
手机端的输入框应该人性化一点，比如手机号、卡号输入框应该默认显示数字键盘，邮箱输入框应该默认显示邮箱键盘。可以使用html5的input type属性 [访问](http://www.w3school.com.cn/html5/att_input_type.asp)

### 关于input和文本输入内容对齐
当input元素在设置了高度时，在IE7、IE8、IE9下会出现文本和文本输入框内容不能对齐的现象，如果只用line-height可以达到对齐的效果，但是原本正常的浏览器中首次点击输入框的光标可能会比输入的字体高。

line-height和高度设的一样，基本等于font-size。然后用padding撑开就解决了。

	height: 16px;
	line-height: 16px;
    padding: 12px 0px 12px 10px;
    border-radius: 4px;
    border: 1px solid #c8c8c8;
    font-size: 16px;
