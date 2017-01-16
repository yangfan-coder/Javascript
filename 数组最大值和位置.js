
Array.prototype.max = function () {
	var max = -Infinity;
	var index = 0;
	for( var i = 0; i<this.length; i++ ){

		if(max < this[i]){

			max = this[i];	// 不断的赋值
			index = i;	//记录位置
		}
	}
	return `最大值${max}对象的索引值${index}`;
}

Array.prototype.min = function () {
	var max = Infinity;
	var index = 0;
	for( var i = 0; i<this.length; i++ ){

		if(max > this[i]){

			max = this[i];	// 不断的赋值
			index = i;	//记录位置
		}
	}
	return `最小值${max}对象的索引值${index}`;
}


