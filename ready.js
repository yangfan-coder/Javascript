
const  readyRE = /complete|loaded|interactive/;

function ready(callback){
	if(readyRE.test(document.readyState) && document.body){
		callback();
	}else{
		document.addEventListener('DOMContentLoaded',function(){callback()},false);
	}
}
ready(function(){
	alert("加载完成1")
})
ready(function(){
	alert("加载完成2")
})



