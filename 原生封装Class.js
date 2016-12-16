window.onload = function (){

	var aGetClass = getClass(document,'box');
	for( var i = 0; i<aGetClass.length; i++ ){

		aGetClass[i].style.background = 'red';
	}
}
// 普通的方法 (只能选中一个class名称)
function getClass (parents,cls){
	var lis = parents.getElementsByTagName('*');
	var attr = [];

	for( var i = 0; i< lis.length; i++){

		if( lis[i].className == cls ){

			attr.push(lis[i]);
		}
	}
	return attr;
}
// 正则表达式
function getClass (parents,cls){
	var lis = parents.getElementsByTagName('*');
	var attr = [];
	var re = RegExp("\\b" + cls + "\\b")			//只有原始的对象才可以传入参数，这也就是跟简写方式最大的不同；
	for( var i = 0; i< lis.length; i++){

		if( re.test(lis[i].className)){
			
			attr.push(lis[i]);
		}
	}
	return attr;
}