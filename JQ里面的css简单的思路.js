window.onload = function ()
{
	var newCss = css({"height":'300px','width':"500px",'background':'#000'});
	var oDiv = document.getElementById('div1');
	for(var i = 0 ; i <newCss.length; i++){
		var prs = newCss[i].split(':')[0];
		var prs1 = newCss[i].split(':')[1];
		oDiv.style[prs] = prs1;
	}
}
function css(json){
	var attr = [];
	for( var key in  json){
		attr.push ( key + ":" +json[key])
	}
	return attr;
}