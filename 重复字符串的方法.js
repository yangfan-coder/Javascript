var str = "qweqfasfsgdsjokofsmdddddsssddddddddddddaassssdddddddddddd" ;
		var arr = str.split('');
		str = arr.sort().join('')

		var index = 0;
		var value = '';
		var re = /(\w)\1+/g;
		str.replace(re,function($0,$1){

			if( index < $0.length){

				index = $0.length;
				value = $1;
			}

		})
console.log("最多的字符就是："+value+"重复的次数是："+index)