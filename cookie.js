var Cookie = {
	get:function(name){	// 获取cookie
		var cookieName = encodeURIComponent(name) + "=",
			cookieStart = document.cookie.indexOf(cookieName),
			cookieValue = null;
		if(cookieStart > -1){
			var cookieEnd =  document.cookie.indexOf(";",cookieStart);
			if(cookieEnd == -1){
				cookieEnd =  document.cookie.length;
			}
			cookieValue = decodeURIComponent(document.cookie.substring(cookieStart + cookieName.length,cookieEnd));
		}
		return cookieValue;
	},
	set:function(name,value,mun,expires){	// 存储时间的cookie
		var cookieText = encodeURIComponent(name) + "=" + encodeURIComponent(value);
		var exp = new Date();  
		if(expires instanceof Date){
			cookieText += ";expires" + expires.toGMTString();
		}
	    /*
	    	计算：时间戳 + 60*1000 == 1分钟
				   ：60*1000*60 = 1小时
				   ：60*1000*60*24 = 1天
				   ：60*1000*60*24*mun = mun天
	     */
	    if(!!mun){
	    	 exp.setTime(exp.getTime() + 60 * 1000 * 60 * 24 * mun);
	    	 document.cookie = name + "=" + encodeURIComponent(value) + ";expires=" + exp.toGMTString(); 	
	    }else{
	    	 document.cookie = cookieText;
	    }
	},
	unset:function(name,mun){	//  删除cookie
		this.set(name,"",0,new Date().getTime() - 1);	// 过去的时间减去时间戳
	}
}