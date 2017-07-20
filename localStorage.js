/*
	HTML5本地储存，
		localStorage
*/
var store = {
	set:function(key,value){	// 存储
		localStorage.setItem(key,JSON.stringify(value));
	},
	get:function(key){		//获取
		return JSON.parse(localStorage.getItem(key)) || [];
	},
	clear:function(){			// 清除
		return  localStorage.clear();
	}
}