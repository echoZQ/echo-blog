---
layout: post
title: 广场舞项目总结
category: 总结
tags: Jquery Css
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


	 
	