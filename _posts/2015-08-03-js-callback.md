---
layout: post
title: javascript 回调函数
category: 技术
tags: Javascript
description: js回调函数 上下文切换等都需要学通
---

### 起因
今天封装了个异步请求的基础模块。大体代码如下:
	
	;(function ($) {
    	var defaultConfig = {
        	async: true,
        	cache: false,
        	type: "get",
        	dataType: "json",
        	timeout: 5000,
        	timeoutErr: "请求超时，请重试",
        	notice: "处理中...",
        	requestFlag: false, //是否请求中
        	loadList: false //请求类型 false请求商品类  true提交信息类
    	};

    	window.lib.webApi = {
        	httpRequest: function (config) {
            	var setting = $.extend({}, defaultConfig, config),
                	self = this;

            	if (setting.requestFlag) {
                	return;
            	} else {
                	setting.requestFlag = true;

                	$.ajax({
                    	url: setting.url || "",
                    	data: setting.data || "",
                    	type: setting.type,
                    	dataType: setting.dataType,
                    	async: setting.async,
                    	cache: setting.cache,
                    	jsonpCallback: setting.jsonpCallback || "",
                    	timeout: setting.timeout,
                    	beforeSend: setting.beforeSend || self.beforeSendCb(setting),
                    	success: function (data) {
                        	config.successCb && config.successCb(data);

                        	self.completeCb(setting);
                    	},
                    	error: function () {
                        	setting.error || self.errorCb(self, setting)()
                    	}
                	});
            	}
        	},
        	beforeSendCb: function (setting) {
            	setting.loadList ? this.renderLoading(setting) : this.renderMask(setting, setting.notice);
        	},
        	//请求错误回调
        	errorCb: function (self, setting) {
            	self.completeCb(setting);

            	return (function (xml, textStatus) {
                	if (textStatus == 'timeout') {
                    	self.renderMask(setting, setting.timeoutErr);
                	} else {
                    	self.renderMask(setting, "出错啦");
                	}
           		})
        	},
        	//请求完成回调
        	completeCb: function (setting) {
            	setting.loadList ? $('.J-loading').hide() : $('.J-ajax-mask').hide();
        	},
        	//弹出层信息 表单提交
        	renderMask: function (setting, text) {
            	var target = $('.J-ajax-mask');
            	if (target.length > 0) {
                	target.text(text);
                	target.show();
                	return;
            	}
            	var elMask = document.createElement("div"),
                	style = elMask.style;
            	elMask.className += "ajax-mask J-ajax-mask";
            	elMask.textContent = text;
            	style.position = "absolute";
            	style.top = "50%";
            	style.left = "50%";
            	style.padding = "0 1rem";
            	style.transform = "translate(-50%, -50%)";
            	style.height = "2rem";
            	style.lineHeight = "2rem";
            	style.background = "rgba(0, 0, 0, .8)";
            	style.borderRadius = ".15rem";
            	style.fontSize = ".6rem";
            	style.color = "#fff";
            	style.textAlign = "center";
            	document.documentElement.appendChild(elMask);
        	},
        	//加载中 请求列表 需加载loading样式
        	renderLoading: function (setting) {
            	var target = $('.J-loading');
            	if (target.length > 0) {
                	target.show();
                	return;
            	}
            	var elContainer = document.createElement("div"),
                	elImg = document.createElement("div"),
                	elText = document.createElement("span");
            		elImg.className += "loading-img";
            	elText.className += "loading-text";
            	elText.textContent = "加载中";
            	elContainer.className += "loading-container J-loading";
            	elContainer.appendChild(elImg);
            	elContainer.appendChild(elText);
            	document.documentElement.appendChild(elContainer);
        	}
    	};
	})(Zepto);

在处理error的回调时碰到了问题，因为在error中，上下文被切换，我无法在errorCb中使用webApi的其他方法。最终找到的解决办法是给回调函数传参。具体内容见[javascript callback function的理解](http://mao.li/javascript/javascript-callback-function/)