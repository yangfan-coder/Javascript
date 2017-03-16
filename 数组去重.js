

var attrs = [1,2,3,4,5,5,2,6,3];
// 移花接木 返回新的数组;
// 这个思路有点简单就是利用indexOf的方法求出数组里面是不是有想要的数据 有的话就加在新创建数组里面然后返回就行
console.time('time')
	function showTimer (attr)
	{	
		var n = [];
		for ( var i = 0 ; i<attr.length; i++ )
		{

			if ( n.indexOf(attr[i]) == -1)
			{

				n.push(attr[i])
			}
		}
		return n;
		
	};
var a = showTimer(attrs)
console.log(a)
//时间比较长
console.timeEnd('time')

console.time('time')
// 其实这个也是比对 就是创建你一个josn，然后判断josn里面是不是有这个数据有的话 就push一下 返回就行
function showTimer1 (attr)
{

	var n = {};
	var r = [];
	for ( var i = 0; i< attr.length; i++)
	{

		if(!n[attr[i]])
		{
			n[attr[i]] = true;
			r.push(attr[i])
		}
	}
	return r;
}
var b = showTimer1(attrs)
console.log(b)
// 较短
console.timeEnd('time');
/*
	这是刚才看算法的时候发现的,性能消耗的比较大，就是双for来回比对;
	关键的一点就是arr[i]==arr[j]的时候，应该i++,父级的for的索引递加
*/

console.time('time')
	function delRepeat(arr) {
		var newArr = [];
		for( var i = 0 ;i < arr.length; i++){
			for( var j = i+1; j<arr.length; j++ ){
				if(arr[i] == arr[j]){
					i++;
				}
			}
			newArr.push(arr[i]);
		}
		return newArr;
	}
	var arr = ["12","12","123","235",'235'];
console.log(delRepeat(arr))
console.timeEnd('time')


/* 运用ES6的方法去重
   在ES6中新添加了一个Set的数据类型；他类似于数组，但是成员不是唯一的，没有重复的值
   然后在用 Array.from() 转化为数组return就可以，【ES6】
   当然你可以用 [].slice.call(new Set(array)); 【ES3】
   或者是你可以用 [...new Set(array)] return也可以；【ES6】
*/
function dedupe(array){
	return Array.from(new Set(array));
}
var arr = dedupe([1,1,2,3,6,6,3]);
console.log(arr)