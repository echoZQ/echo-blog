---
layout: post
title: php常用资源
category: 备忘
tags: Php 
description: php常用资源 
---

### php中文字符串的截取
	mb_strlen( $str, $encoding ) 
	// 获取中文长度
	// $str，要计算长度的字符串 
	// $encoding，网页编码，如utf-8,GB2312,GBK 
	
	mb_substr( $str, $start, $length, $encoding ) 
	// 截取中文字符串
	// $str，需要截断的字符串 
	// $start，截断开始处，起始处为0 
	// $length，要截取的字数 
	// $encoding，网页编码，如utf-8,GB2312,GBK 
	
### php数组反向排序
	
	array_reverse() //函数传入参数为一数组，返回一个与传入参数值相同但顺序相反的数组
	
### array\_key\_exists

	array_key_exists(key,array)
	//array_key_exists()函数判断某个数组中是否存在指定的key，如果该key存在，则返回true，否则返回false。

### property_exists

	property_exists(mixed $class, string $property) 
	／／判断某个类是否有某个属性
	
### php 二维数组排序
	
	/**
     * 二维数组按指定键值排序
     *
     * @param array $array 数组
     * @param string $keys 键名
     * @param string $type 排序方式
     * @return array|string
     */
    public function array_sort($array, $keys, $type='asc') {
        if(!isset($array) || !is_array($array) || empty($array)){
            return '';
        }
        if(!isset($keys) || trim($keys)==''){
            return '';
        }
        if(!isset($type) || $type=='' || !in_array(strtolower($type),array('asc', 'desc'))){
            return '';
        }
        $keysValue=array();
        foreach($array as $key=>$val){
            $val[$keys] = str_replace('-','',$val[$keys]);
            $val[$keys] = str_replace(' ','',$val[$keys]);
            $val[$keys] = str_replace(':','',$val[$keys]);
            $keysValue[] = $val[$keys];
        }
        asort($keysValue); //key值排序
        reset($keysValue); //指针重新指向数组第一个
        foreach($keysValue as $key => $vals) {
            $keysort[] = $key;
        }
        $keysValue = array();
        $count = count($keysort);
        if(strtolower($type) !== 'asc'){
            for($i = $count-1; $i >= 0; $i--) {
                $keysvalue[] = $array[$keysort[$i]];
            }
        }else{
            for($i = 0; $i < $count; $i++){
                $keysValue[] = $array[$keysort[$i]];
            }
        }
        return $keysValue;
    }
    
### xss攻击防御

只要是产生XSS的地方都是伴随着输入或者输出的，过滤 ' " , <  > \   <!--等  
	
### empty()与isset()的区别

empty()和isset()的处理对象无外乎未定义变量，0，空字符串  
如果变量为0，则empty()会返回TRUE，isset()会返回TRUE；  
如果变量为空字符串，则empty()会返回TRUE，isset()会返回TRUE；  
如果变量未定义，则empty()会返回TRUE，isset()会返回FLASE；

当要 判断一个变量是否已经声明的时候 可以使用 isset 函数  
当要 判断一个变量是否已经赋予数据且不为空 可以用 empty 函数  
当要 判断 一个变量 存在且不为空 先isset 函数 再用 empty 函数  
	
	