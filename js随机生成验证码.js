/*
	随机生成验证码的小demo
	
	-This
 */

var codeChars = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 
      'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z',
      'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']; 

var randomFn = function(){
	var str = '';
	for(var i = 0; i<4; i++){
		var mun = Math.floor(Math.random()*codeChars.length);
		str += codeChars[mun];
	}
	return str;
}
console.log(randomFn());





