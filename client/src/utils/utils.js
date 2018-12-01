import React, { Component } from "react";
let Utils = (() => {

	const convert_unit = 1024;

	const downConvert = (num) => {
		return num * convert_unit;
	}

	const fixNumber = (num, fix = 1) => {
		if (typeof num === "number")
			return parseFloat(num.toFixed(fix));
		else
			return num;
	}

	const convertBool = (boo) => {
		return boo ? "是" : "否";
	}

	const formatTime = (str) => {
		return str.substr(0, 4) + "-" + str.substr(4, 2) + "-" + str.substr(6, 2) + "  " + str.substr(9, 2) + ":" + str.substr(11, 2) + ":" + str.substr(13, 2);
	}

	const getPercent = (num) => {
		if (typeof num === "number")
			return fixNumber(num * 100) + "%";
		else
			return num;
	}

	const getNamedObj = (obj) => {
		if (typeof obj === "object" && obj) {
			let newobj = Object.prototype.toString.call(obj) === "[object Array]" ? [] : {};
			for (let key in obj) {
				if (typeof key === "string") {
					let newKey = key[0].toLowerCase() + key.substr(1);
					newobj[newKey] = getNamedObj(obj[key]);
				} else {
					newobj[key] = getNamedObj(obj[key]);
				}
			}
			return newobj;
		}
		return obj;
	}

	const fixObjNumber = (obj) => {
		console.log(obj)
		if (typeof obj === "object" && obj) {
			for (let key in obj) {
				obj[key] = fixObjNumber(obj[key]);
			}
			return obj;
		}
		return fixNumber(obj);
	}

	function throttle (fn, wait) {
	    let _fn = fn,       // 保存需要被延迟的函数引用
	        timer,          
	        flags = true;   // 是否首次调用

	    return function() {
	        let args = arguments,
	            self = this;

	        if (flags) {    // 如果是第一次调用不用延迟，直接执行即可
	            _fn.apply(self, args);
	            flags = false;
	            return flags;
	        }
	        // 如果定时器还在，说明上一次还没执行完，不往下执行
	        if (timer) return false;
	            
	        timer = setTimeout(function() { // 延迟执行
	            clearTimeout(timer);    // 清空上次的定时器
	            timer = null;           // 销毁变量
	            _fn.apply(self, args);
	        }, wait);
	    }
	}

	function curry(fn) {
    	const g = (...allArgs) => allArgs.length >= fn.length ?
	        fn(...allArgs) : 
	        (...args) => g(...allArgs, ...args)

	    return g;
	}

	function timeChunk(data, fn, count = 1, wait) {
	    let obj, timer;

	    function start() {
	        let len = Math.min(count, data.length);
	        for (let i = 0; i < len; i++) {
	            let val = data.shift();     // 每次取出一个数据，传给fn当做值来用
	            fn(val);
	        }
	    }

	    return function() {
	        timer = setInterval(function() {
	            if (data.length === 0) {    // 如果数据为空了，就清空定时器
	                return clearInterval(timer);
	            }
	            start();    
	        }, wait);   // 分批执行的时间间隔
	    }
	}

	const redStyle = (item) => (<p style={{color:"red", margin:0}}> {item} </p>)
	const greenStyle = (item) => (<p style={{color:"green", margin:0}}> {item} </p>)

	const compare = (x, y) => {//比较函数,升序
      if (x < y) {
          return -1;
      } else if (x > y) {
          return 1;
      } else {
          return 0;
      }
  }

	return {
	    downConvert: downConvert,
	    fixNumber: fixNumber,
	    convertBool: convertBool,
	    formatTime: formatTime,
	    getPercent: getPercent,
	    getNamedObj: getNamedObj,
	    fixObjNumber:fixObjNumber,
	    redStyle:redStyle,
	    greenStyle:greenStyle,
	    compare:compare
	}

})();

export default Utils;