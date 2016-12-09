

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

