---
layout: post
title: 性能优化
category: 总结
description: 性能优化的一些工作记录
---

陆续做了一些H5性能优化方面的工作，下面简单做一些归纳:

## 通用优化手段 
### 多域名   
一方面为解决浏览器对相同域名的并发连接数限制(**提高并发**)；另一方面可做到**互为backup**，比如我们是阿里云和又拍云并行使用(指向同一域名空间)，似乎也有分流上的考虑。感兴趣的可以看下[又拍云、阿里云联合云存储](http://www.sohu.com/a/119858565_430930)

### CDN
简单来讲就是在不同地点缓存内容，通过负载均衡，将用户请求定向到最合适的缓存服务器上获取内容。通过就近访问，加速用户对网站的访问；解决网络拥堵状况，提高用户访问网络的响应速度。具体可以看下[使用CDN有什么好处](https://www.zhihu.com/question/36514327) 

使用cdn的时候有一点需要**注意**，即文件的缓存更新问题。实际上，若你的js/css文件缓存时间较长且是覆盖式发布，那需要注意，哪怕反复多次强刷cdn，它的刷新率也是很低的，**做不到100%所有节点的缓存文件都被刷新**。

### 图片裁剪
电商网站，图片是流量大头，流量==钱。cdn厂商一般会提供图片裁剪功能，选择合适的图片尺寸可有效节省流量，资源小->加载快->用户体验好->买买买。  

这里涉及几个点：  

	1. 规范，对于图片尺寸的使用需要有一套统一的规范供各开发遵守(规范推进这件事实属不易)；  
	2. 阿里云和又拍云并行使用的场景下，各域名空间裁剪格式数量有限(两家公司的裁剪后缀格式不同，需要花钱买统一的尺寸支持)。所以在这件事上我也是第一次知道可以用”二八原则“去解决主要矛盾，而不要强求面面俱到；  
	3. 低分辨率及弱网适配，可以选用不同品质的图片以提升用户体验

### webp
webp在有效减少图片尺寸的情况下还能保证图片质量。但需注意的是，webp有兼容性问题，ios原生不支持webp。关于webp有以下几个点：

	1. webp可用性检测，开始我们使用请求base64图片加载是否成功判断页面运行环境是否支持webp(缺点是异步),然后怡志提出了同步判断webp的方法，原理为创建canvas画布，若转码成功则开头会有webp标记。详情请阅读怡志原文[如何同步判断设备是否支持webp](https://mp.weixin.qq.com/s?__biz=MzA5NTMxNDQ5NA==&mid=2452049724&idx=1&sn=35fbcaf1046f9c1a7d3e47d565f85280&chksm=8792d86db0e5517bbb4f9d252303e5bcee9c296e58d6d13d7cb710c55177aa81bfbf0b5372d2&mpshare=1&scene=1&srcid=0630Gm79dsWt4vDiFFmsmIzy&key=58e45431df36b4fb3ee64924c96d891ea7d4111bcb1f454fb984e3d3af76e9f421f97a26b0c3e5689f03b1d8ffc2ab70d9cf072d4cb47cecc4cb7ec354b1bcc0e2b9151439a6e4e3c761521bf2eced11&ascene=0&uin=MTExNDgzMzA4Mg%3D%3D&devicetype=iMac+MacBookPro13%2C2+OSX+OSX+10.12.5+build(16F73)&version=12020110&nettype=WIFI&fontScale=100&pass_ticket=%2FIwOPLJZEQTVXSfOXjWeFATNKktdQNgPTW5NwDrkMYW86ypjTVeJvYscZxlpTPLu)  
	2. ios客户端支持。使用解析库对webp后缀图片进行转码处理，从而使得ios客户端内可使用webp图片

更多了解webp,可查看[webp探寻之路](https://isux.tencent.com/introduction-of-webp.html)

### iconfont
项目中的小图标使用iconfont可以有效减少图片请求，同时iconfont还有很多优点，如：  

	1. 矢量字体可随意改变大小  
	2. css和html中都可使用  
	3. 制作相对简单，而且阿里矢量图标库有很多现成的图标可以用┑(￣Д ￣)┍

但是不能不说，一旦涉及到维护的问题，就变得麻烦了。
  
	1. 所有的前端同学需要有这种使用iconfont的意识，物尽其用。如果库都引入了页面中还有小图标请求，这就不可爱了么。    
	2. 业务快速迭代的过程中，旧的已不适用的图标怎么处理也是难题。我们不能让我们的图标库越来越冗余。
	3. iconfont库的大小不容小视，为了页面一两个图标而引入几十kb的图标库也不合适。这中间需要权衡与关注。

### 雪碧图
图片优化也需要分场景，在有些图片不适合做成iconfont的场景下我们可以选择将图片合成为雪碧图以减少图片请求，这在H5游戏页面中经常会使用到。   

推荐一个一直使用的在线雪碧图生成网站[CSS Sprite Generator](http://www.cn.spritegen.website-performance.org/)  ==但是打开有点慢，有时候要拼人品○|￣|_

### 图片压缩
图片压缩有个点要注意(页面中的图片来源)：

	1. 开发写的，那么开发需要注意自己的图片一定是经过压缩的；
	2. 接口回传的图片，这种情况下往往会是运营上传的图片，我们无法要求所有运营在上传图片前先做好压缩工作，况且这也会降低运营人效，所以最根本的做法就是在根源处做好图片尺寸、大小限制，并写好上传压缩的代码。

图片压缩推荐使用[tinypng.com](https://tinypng.com/)

### 统一占位图
hms最开始优化前，不同模块使用的占位图五花八门，等N个模块组成一张页面时，可能莫名多好几个占位图请求。在这里想说明的点其实是，不要用同一张图片的不同链接，纯粹浪费(还有**定义并推进规范的重要性**)。

### 不要使用base64

### 简化命名

### dns-prefetch 
浏览器访问域名的时候，需要去解析一次dns，即把域名解析到对应的ip地址上。面对移动前端分秒必争的现状，通过dns-prefetch去指示浏览器预解析dns来减少页面延迟也是必然。根据我们性能平台数据观察还可以发现一个特点，页面间反复跳转的情况下，整体的dns解析时候会更短。

#### 静态资源版本更新及缓存(非覆盖式发布)  
开始我们的资源是通过参数后加版本号更新发布的。为了解决资源缓存时间设置仅为24H这个问题，将上述覆盖式的发布方式改成了非覆盖式发布(缓存时间可以设置很长)。gulp或者webpack的都提供插件可以处理这个问题。
  
为什么要用非覆盖式发布，这个没有什么比直接看张云龙这篇声情并茂的博客更好的了，强烈推荐大家看看[大公司里怎样开发和部署前端代码](https://github.com/fouber/blog/issues/6)  

除了缓存时间外，是否正确配置expires等也是需要注意的点

### async
有些脚本本身可以异步加载和执行的，可以用async，可以减少阻塞(加载时不阻塞页面渲染)。但是用async时请注意，js一旦下载好了就会执行，所以很有可能不是按照原本的顺序来执行的，请确保js前后没有依赖性再使用此特性。

### 使用懒加载

图片懒加载 && 区块(dom)懒加载


### 预加载(离线缓存)
页面的离线缓存方案
数据离线缓存

ios使用localStorage时setItem会超出限制。所以对setItem
使用了try catch；
同时对hms页面存储的数据增加了清理机制，具体为setItem前删除7天前所有页面的本地数据。


### 去除冗余代码
冗余代码会比你想象的多

### 去除模块耦合

### 统一预编译模板
说来惭愧，hms这边因为缺乏规范，连预编译模板都是乱的，有的模块开发时用了juice，有的用了handlebar，这就导致引入了两个模板库，最后选择了handlebar。

### 排查空链接
css中background千万别设空链接，background: url('') 会发起多余的当前页面请求。这种情况一般发生在模块开发中，开发者对运营上传图片缺少验证，变量为空的情况下就会产生background: url('')。

### url参数
尽量避免在访问页面时传递一些变化的参数，这样会导致无法命中CDN缓存，比如一些地理位置相关的参数。

其次，cdn基础配置中可以设置过滤参数，开启过滤参数的作用是忽略URL请求中"?"之后的参数，提高CDN缓存的命中率。详情请看[CDN基础配置中过滤参数的作用](https://help.aliyun.com/knowledge_detail/40087.html)

### 避免重定向
比如短链接。不排除短连接有时候是必要的，如短信推送中的长度限制时。但短连接会造成页面重定向，在不含长度限制的情况下，我们本身的打点系统已经可以做到比较全面的数据跟踪，没必要再使用短链接。

### uglify&gzip
减少文件体积

### 代码性能
1. 比如在动画上使用box-shadow会非常损耗性能,以前做拼图游戏的时候，因为在可移动的拼图上添加了box-shadow导致安卓机卡的不要不要的。

高消耗的样式有:

	box-shadows	border-radius
	transparency	transforms
	CSS filters（性能杀手）

[如何实现平滑的“box-shadow”动画效果](https://www.w3cplus.com/css3/how-to-animate-box-shadow.html)  
[CSS 优化、提高性能的方法有哪些？](https://www.zhihu.com/question/19886806/answer/50285495)    
[css lint](http://csslint.net/)  
[css lint介绍](http://nomospace.com/posts/css-lint.html)

代码优化这点其实是容易让人忽略，实际上分析代码找出性能瓶颈再考虑优化策略更为合理      

	1. 删除冗余css、js、html代码  
	2. 合理使用首屏加载、按需加载、滚屏加载
	3. for循环过多，逻辑重复等

这方面很多人写过，可以参考一些[移动H5前端性能优化指南](https://isux.tencent.com/h5-performance.html)

### 接口优化
#### 一：接口耗时有时对页面性能是致命的，动态渲染的页面，首屏快慢强依赖于接口返回时间。

接口优化，需要找后端的同学予以支持。这种情况是需要提供证据的，你不能直接找到后端告诉对方"我感觉你的接口很慢，影响了我的首屏时间"。

我们能做的是在打点库中增加对接口的监控。鉴于我们各条业务线都使用的zepto,且zepto中ajax的global参数默认为true，故每个ajax请求都能触发ajax的全局事件处理程序。所以我们可以通过监听ajaxComplete方法知道每个请求的请求类型、请求方法、请求参数等内容,结合window.performance.getEntries()方法，我们就能获得我们想要的接口相关信息。  

打点上报后的数据展示此处不表。

	window.addEventListener('ajaxComplete', function (e) {
        var arg1 = e._args[0],
            arg2 = e._args[1];
        var dataType = arg2.dataType && arg2.dataType.toLocaleLowerCase(),
            type = arg2.type && arg2.type.toLocaleLowerCase(), // get/post
            info = {
                url: arg2.url,
                dataType: dataType || NO_VALUE,
                method: type || NO_VALUE,
                status: arg1.status || NO_VALUE
            };
        
        if (dataType === "jsonp") {
            info.url = info.url.replace(/callback=\?/, "callback=" + arg2.jsonpCallback);
        }
        
        // ...
        
    });

##### 资料
[zepto_api](http://www.css88.com/doc/zeptojs_api/)  


#### 二：接口缓存  

我们看下这个接口的问题http://sapi.xx.com/resource/config.html?\_=1498618352975&callback=xx\_config   

这是一个访问量很大的jsonp接口，且数据并非实时变化。由于我们在ajax请求中未使用接口缓存，导致zepto/jquery会以时间戳方式穿透cdn(请求中的\_=1498618352975参数)，cdn回源，无端造成服务器压力。  


	 $.ajax({
        url : url,
        type : 'GET',
        cache : true, // 若数据非实时变化，请开启缓存，否则jQuery/zepto会以时间戳的方式穿透CDN
        dataType : 'jsonp', 
        jsonpCallback : 'xx_conf' // 明确指定回调函数名，否则jQuery会自己附加一个随机的再请求里面
    });
    
 我们知道如果是jsonp的请求，jsonpCallback是可以不明确指定的，不指定的情况下，jquery/zepto是会自己随机一个附加值在请求里面的，这样就会造成跟不写cache:true一样的后果，即cdn无法命中。
 
 
说到这里可以再额外补充一点，如果我们有一个需要分页加载的页面。在快速向下滚动页面的时候会很快的发起分页请求。如果我们的分页请求B在分页请求A请求成功返回内容前发起，且二者jsonpCalback一模一样的话，那浏览器会报如下错误,且B请求无法正常发送成功。  
![](http://h0.hucdn.com/open/201726/5648415c6cb84cc4_1878x114.png)
故我们一般性的做法是在jsonpCallback的回调函数中加循环计数以解决这个问题。   


#### 三：接口合并  
  
这条没有实践，暂且不表


#### 四：删除冗余接口   
 
我们发现，很多页面会有下面几种情况：  

	1. 请求广告位，但该广告位长期没人维护(产品需求提后运营没有使用等情况)，永远都返回空数据  
	2. 请求配置项，配置项千年不变(产品刚开始的设想是需要运营动态配置，而实际是接口写死配置)
	3. 无用的统计接口(如早年的百度/谷歌统计)

上述几种情况，完全可以删除这些无用接口，或直接将数据写死在页面中以减少请求。

### 查看页面性能
#### 一：整体性能观察
个人习惯是使用chrome的隐身模式查看性能，因为隐身模式可以避免浏览器中可能存在的插件干扰。可以对比下隐身模式/非隐身模式下的performance。

非隐身模式：  
![](http://h0.hucdn.com/open/201726/a64a619ae62d4ea7_1580x1068.png)  

隐身模式：
![](http://h0.hucdn.com/open/201726/167e3774531428f5_1530x1086.png)


#### 二：环境模拟  
网络和机器性能很好的情况下，很多问题是暴露不出来的，好比很多性能优化在pc端是可以不用做的，但在移动平台下就必须引起重视一样。

在CC的建议下，一般会选择Regular 3G的网络情况和5倍slowdown的CPU性能做模拟(移动环境)    
![](http://h0.hucdn.com/open/201726/b91238186bca329a_1564x246.png)


### 优化推进的难点
推进业务线优化的过程中有下面这样的问题：

	1. 业务线快速迭代，原作者在忙于新业务开发与老业务迭代的过程中没有精力时刻关注性能变化    
	2. 性能的影响因素其实有很多，页面打开方式、后端、客户端的一些变化都会造成性能抖动  

大约归根到底还是性能的重要性还是很有真正深入人心，还有一点则是我们的优化方案还不够全面普及

### 页面监控
sentry(上报错误可直接派发给对应开发者&&邮件提醒&&自定义上报错误等)

在做比较大的改造/版本升级时，需要关注sentry上的告警信息，很多测试不到的问题通过sentry我们可以快速获得，及时修复bug快速止损。这个点是需要注意的。

### 还有一些未做的优化点
#### 一：静态资源域名隔离

cookie隔离：如果静态文件都放在主域名下，那静态文件请求的时候都带有的cookie的数据提交给server的，非常浪费流量  

#### 二：安卓客户端dns解析前会比ios平白多出四五百毫秒时间
 
这估计要涉及到安卓内核了，ios客户端用的是wkwebview，性能非常好。而安卓目前用的是chrome的内核。我们不对比ios客户端，在安卓中，页面在微信中访问的浏览器耗时比我们自己的安卓客户端耗时快好几百毫秒，与ios的性能不相上下，当然微信用的是QQ浏览器搞的X5内核，具体不是搞客户端的，不敢贸然说X5的内核是不是有很多坑(咨询过有赞的安卓开发，他们现在用的是X5，表示坑不多，还能与微信共享内核)。

还有一块涉及到站外唤起站内页面，推送的页面启动app流程较长且消耗cpu故造成页面性能差(dns解析前大段的浏览器耗时)

### 一些乱七八糟的
在优化这个事情上，我觉得最难的是坚定方向。像阿里搞了weex直接绕开了webview，虽然推出weex也不是完全只是为了解决性能问题，但是总体来讲它是直接换了条道路。之前跟超哥的时候他提到，实际浏览器的很多坑已经踩完了(相较于前些年的浏览器，如今进步已经很大了)，我们是不是在webview里面也可以做到比较极致的优化，而不要贸然抛弃它?  
 
有些优化手段并不是绝对的，比如有时候将css内联会比外链更好(稍微增加一点html体积但是减少一个请求)。很多时候，如果条件允许，可以做一些ABTest去验证真实效果。  

最后，不要小看任何一点小的优化。