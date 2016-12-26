

// 测试浏览器的版本
alert(window.navigator.userAgent)
// IE10以下的版本
if( navigator.userAgent.indexOf('MSIE') !== -1 ){
	alert("IE浏览器")
}else{
	alert("不是IE")
}


