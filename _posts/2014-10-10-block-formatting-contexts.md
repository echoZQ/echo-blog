---
layout: post
title: 块级格式化上下文
category: 技术
tags: Css
description: 关于清楚浮动及块级格式化上下文
---
### 浮动的缺陷
影响它的兄弟元素的位置和父元素产生高度塌陷(浮动的元素**脱离了普通流**，这样使得包含它的父元素并不会因为这个浮动元素的存在而自动撑高，这样就会造成高度塌陷)。这些兄弟元素若是块级元素会无视这个浮动的块框，也就是我们平时看到的效果——使到自身尽可能与这个浮动元素处于同一行，导致被浮动元素覆盖，除非这些 div 设置了宽度，并且父元素的宽度不足以包含它们，这样兄弟元素才会被强制换行；若是内联元素，则会尽可能**围绕浮动元素**。


### 清除浮动的方法

①**清除**浮动(clear: both 清除了浮动对于兄弟元素的影响，而高度塌陷的问题还没有解决。)  
②**闭合**浮动(因为浮动的元素脱离了普通流，因此对于它的父元素，它并没有闭合，这时候就需要闭合浮动了。更确切的含义是**使浮动元素闭合**，从而减少浮动带来的影响。):    
	1.空div 添加clear: both --会添加很多无意义的空标签，有违结构与表现的分离，在后期维护中将是噩梦建议不要。
	2.在浮动元素的父元素上设置了 overflow 的值为 hidden 或 auto （**父元素创建了新的BFC**），可以闭合浮动。另外在 IE6 中还需要触发 hasLayout ，例如为父元素设置容器宽高或设置 zoom：1  
	3.伪元素:after
		
		<style>
    		.clearfix {
    			/* 触发 hasLayout */ 
    			zoom: 1; 
    		}
    		.clearfix:after {    		
    			content: “.”; 
    			display: block; 			
    			height: 0; 
    			clear: both; 
    			visibilit hidden; 
    	    }
		</style>
	
其余还有父元素设置display:table、使用 br标签和其自身的 html属性、父元素也设置浮动（不可能一直浮动到body）等。


### 参考链接
感谢作者[访问](http://kayosite.com/remove-floating-style-in-detail.html)
感谢作者[访问](http://www.iyunlu.com/view/css-xhtml/55.html)