var isUrl = window.navigator.userAgent.toLowerCase();
if(isUrl.indexOf("micromessenger") != -1 ){
	console.log('微信');
}else{
	console.log("不是微信");
}