---
layout: post
title: 广场舞项目总结
category: 总结
tags: jQuery Css
description: 第一次跟小池姐姐做的项目-广场舞项目经验总结
---


## jquery插件与IE8
### jquery.validate与jquery.form

jquery.validate是一个很好用的表单验证插件,可以与jquery.form(将以html形式提交的表单升级成采用ajax提交的表单。 插件里面主要的方法, ajaxForm 和 ajaxSubmit)一起使用,使用方法看文档就好了。今天具体记录一下这两货撞上IE8后的惨烈场面-(简单的登录为例).

1. 最开始遇见的问题是其他浏览器都正常,到IE8和IE7的时候，表单验证正常，但是表单提交**没有参数传递**。我以为是validate的问题，绕了一大圈！！!
2. 查了很多validate与IE8的资料，居然没有人跟我遇见相同的情况，然后想起来说不定是**form插件的问题**，所有问题定位才正确了。下了最新版的form插件，form数据提交正确，但是IE8下会直接提示json格式文件下载，这是又遇到一个问题。
3. stackoverflow上给的解决方案是dataType不要用“json”,使用dataType: “text”。这种方案确实可以解决这个问题具体代码如下:

		//后台返回json格式组装的字符串(text),在前台将字符串转化为JSON对象 但是注意IE8不支持JSON，可以用json2解决
		if (typeof (JSON) == 'undefined') {
            //如果浏览器不支持JSON，则载入json2.js
            $.getScript('/static/js/lib/json2.js');
        }
		var success = function (data) {
			//data的形式如: '{"status": "0", "msg": "用户名或密码错误"}' 特别要注意单双引号，否则IE下容易报错
            data = JSON.parse(data);
            if (0 === parseInt(data.status, 0)) {
                $('.error').text(data.msg);
            } else {
                window.location.href = data.redirectUrl;
            }
        };

        $('#loginForm').ajaxForm({
           success: success,
           dataType: 'text', //使用text而不是json
           type: "post"
        });

        $('body').on("click", ".login-btn", function () {
            if($("#loginForm").valid()){
                $("#loginForm").submit();
            }
        });
        

4. 其实还有一种解决方案是把好基友拆散了，抛弃jquery.form,后台照旧返回json对象，前台重新使用ajax去提交表单
	
		$('body').on("click", ".login-btn", function () {
            if (!$("#loginForm").valid()) {
                return false;
            }
            $.post('/user/doLogin', $('#loginForm').serialize(), function (data) {
                success(data);
            });
        });
	 
5. 两种解决方案，前者好像麻烦点改动更多，但具体孰优孰劣我也说不上来==.

## placeholder兼容问题
	
	不支持html5的低版本的浏览器中，placeholder属性是无效的，可以用jquery去实现placeholder。但是如果input的type是password的时候，出现的会是...,我们可以对password另外写一段js代码：给定两个输入框，一个是text，一个为password的，在有焦点的时候，切换为password，失去焦点的时候，切换为text用来展示placeholder属性.
	
	<input type="text" id="pwd" value="请输入密码"/>
	<input type="password" id="password" style="display:none;"/>
	<script type="text/javascript" src="jquery-1.7.2.js"></script>
	<script type="text/javascript">
		$(function(){
    		var pwd = $("#pwd");
    		var password = $("#password");
    		pwd.focus(function(){
        		pwd.hide();
        		password.show().focus();
    		}); 

    		password.focusout(function(){
        		if(password.val().trim() === ""){
           			password.hide();
            		pwd.show();
        	}
   	 	});
	});
	</script>

## 输入框值实时监听
涉及评论功能时需要实时监听输入的字数，完成可输入字数的计数功能。下面有一些关于这个功能的注意点
1. 如果用max-length,那空格或换行符会导致计数值错误，所以直接用js统计比较好  
2. 单使用input(HTML5的标准事件，对于检测 textarea,input:text, input:password和input:search 这几个元素通过用户界面发生的内容变化非常有用，在内容修改后立即被触发，不像onchange 事件需要失去焦点才触发)和propertychange(IE特有)并不能很好的监听复制粘贴事件，所有更好的做法是focus、keyup、input、propertychange四个事件一起使用。  
3. 在未登陆状态下评论，先跳转登陆页。需要js用cookie记录评论内容。问题是cookie存储时会把换行符以后的内容直接过滤掉(chrome)，而IE则会将换行符显示为'_'  需要注意的是不同系统下换行符是不同的Windows系统里面(“\r\n”)、Unix系统里(“\n”)、Mac系统里("\r"),虽然如此，但实践后发现只有如下方案可以完美解决上述问题
	
		setCookie: function (name, value) {
            value = value.replace(/\r/g, ""); //先过滤掉/r否则IE下会出现'_'
            value = value.replace(/\n/g, "<br>"); //将/n换成<br>
            document.cookie = name + "=" + value;
        },
        getCookie: function (name) {
            var start, end, value;
            if (document.cookie.length > 0) {
                start = document.cookie.indexOf(name + "=");
                if (start !== -1) {
                    start = start + name.length + 1;
                    end = document.cookie.indexOf(";",start)
                    if (end === -1) {
                        end = document.cookie.length;
                    }
                    value = document.cookie.substring(start, end);
                    value = value.replace(/<br>/g, "\r\n"); //将<br>换成“\r\n”
                    return value;
                }
            }
            return ""
        }

4.纠正一下3，其实用escape()与unescape()函数对字符串进行编码与解码即可。

## 关于兼容IE的文档模式
之前项目开发过程中一直用IE7文档模式(因为IE8比较难搞)，但是IE7的文档模式导致原本应该支持圆角阴影等属性的IE9,10等都不支持了，页面很难看。看了淘宝和花瓣等网站，发现他们都是如下的兼容方式。IE7,8,9,10及360等均有较好的表现。
	
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">//如果安装了GCF，则使用GCF来渲染页面「”chrome=1″」，如果没有安装GCF，则使用最高版本的IE内核进行渲染「”IE=edge”」。
	
## 让IE6支持png透明
IE6不支持png透明，在IE6下用gif替代png也不是什么好办法。本项目中尝试了滤镜，效果不错。[访问](http://www.w3cfuns.com/thread-297-1-1.html)

## 问题
### grunt打包css
全站的css用grunt合并成了一个文件，但是会出现样式覆盖的问题。如果一开始的时候就想到最终要打包成一个css文件，那当初写的时候应该多一些class命名还是怎么做，还没想通。  
为了减少http请求，代码重构的时候使用了seajs，但是spm打包后，IE8和IE7会有时报jquery.validate中的未定义错误，并且有的电脑会有的电脑不会。使用seajs之前没有此现象。  
jquery.validate及jquery.placeholder等顶级模块不知是否应该统一打包进去。

### jquery.validate未定义错误
在spm对js打包后，在IE及qq等浏览器中会不时出现“未定义null form属性”的问题，在含表单验证的模块中奖验证代码加在$(function() {});就好了

### 搞不赢的浏览器
之前meta标签使用了<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">，测试的时候各台电脑都表现良好。但是广州哥哥的IE8没有安装GCF导致这个meta标签不奏效，我不得不重新写一些css hack。但是这些css hack写了以后又会影响到安装了GCF的IE浏览器及使用IE内核的浏览器。



### 参考链接
[访问](http://www.cnblogs.com/lhb25/archive/2012/11/30/oninput-and-onpropertychange-event-for-input.html)
	 
	