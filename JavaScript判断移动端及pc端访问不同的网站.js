;(function(){

	/*
		首选获取到的当前的地址，然后判断往前的地址是不是自己的地址并且浏览器的信息
		返回的手机是不是苹果、安卓、或者ipad 不区分大小写
		这些条件都成立的话 那么就替换地址

	 */
	var url = location.href;
	if(url.indexOf("www.test.com") != -1 && navigator.userAgent.math(/(iPhone|iPod|Android|ios|iPad)/i)){
		location.href  = url.replace("http://wwww","http://m");
	};
}());



