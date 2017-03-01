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

	// 我刚发现还有一种特简单的排序 我的天哪~~
	var friends = [
		{name:"John",age:30},
		{name:"Ana",age:20},
		{name:"Chris",age:10}
	]
	function comparePerson (a,b) {		// 比较一下得了呗 亏我想的那么多（妈蛋。）
		if(a.age > b.age) {
			return 1;
		}else if(a.age < b.age) {
			return -1;
		}else {
			return 0;
		}
	}
	console.log(friends.sort(comparePerson))


}())


