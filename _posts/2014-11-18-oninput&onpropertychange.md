---
layout: post
title: 输入框值实时监听
category: 备忘
tags: jQuery
description: 广场舞web端项目
---

### 注意事项

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




### 参考链接
[访问](http://www.cnblogs.com/lhb25/archive/2012/11/30/oninput-and-onpropertychange-event-for-input.html)