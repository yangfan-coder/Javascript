var str = "りんなに #OOTD をチェックしてもらったよ♪ http://webappsjp-test.azurewebsites.net/imagegame/start?task=fashion&form=tw&r=1481705958025";
console.log( replaceUrlParams(str,{"form":"666666","r":"1111111"}) )
function replaceUrlParams(link,json){
	if(typeof link == 'string' && json == null ){			
		return link;
	}
	else if( $.type(json) == 'object'){
		if( link.indexOf("?") != -1)
		{
			var  baseurl = link.split('?');
			if(baseurl.length > 1)
			{
				var  params = baseurl[1].split('&');
				var  name = Object.keys(json);
			    for( var i = 0; i<name.length; i++ ){
			    	var returnFn = constructorFn(name[i],json[name[i]],params,baseurl)
			    }
			    return  returnFn;
			}
		}
	}
}
function constructorFn(name,value,pars,bas){
	for( var i = 0; i<pars.length; i++ ){
		if(name == pars[i].split('=')[0]){
			pars[i] = name + '=' + value;
			break;
		}			
	}
	if( i == pars.length){
		pars[i] = name + '=' + value;
	}
	return LastHoleFn(pars,bas);
}
function LastHoleFn(param,url)
{
	var res = url[0] + '?' + param[0];
	for( var i = 1; i<param.length; i++){
		res += '&'+ param[i];
	}
	return res;
}