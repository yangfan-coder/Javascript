

/*
	存储变量
*/
var obj = {
	count:0,
	cool:function coolFn(){
		var self = this;
		setTimeout(function(){
			console.log(self.count)
		},100)
	}
}
obj.cool();

/*
	ES6 的箭头绑定
*/
var obj = {
	count:0,
	cool:function coolFn(){
		var self = this;
		setTimeout(() =>{
			console.log(self.count)
		},100)
	}
}
obj.cool();

/*
	使用bind()
*/
var obj = {
	count:0,
	cool:function coolFn(){
		setTimeout(function (){
			console.log(this.count)
		}.bind(this),100)
	}
}
obj.cool();




