(function(){

	var obj = [{date:'2017-05',k:'aa'},{date:'2017-08',k:'bb'},{date:'2016-08',k:'11'}];	//原始数据
	var mun = [] ;	// 暂存数据
	var newArr = []	// 返回数组
	
	function res(str) {		// 通过正则获取到日期拼接的字符串
		var re = /(\d{1,4})(-)(\d{1,2})/;
		return str.replace(re,function($1,$2,$3,$4){
			return $2 + $4;
		})
	}
	
	for( let i = 0; i < obj.length;  i++) {	

		mun.push(parseInt(res(obj[i].date)))	//循环放在一个数组中把所有数据的数字
	}
	
	mun.sort();	// 排序 （真正的排序应该判断一下，现在就是一种思路）

	for (var i = 0;i<mun.length;i++) {		
		for (var j=0;j<obj.length;j++) {
			if(mun[i] == parseInt(res(obj[j].date))){		// 循环两个数组来回比对 正确的返回新的数组
				newArr.push(obj[j]);
			}
		}
	}
	console.log(newArr);
}())