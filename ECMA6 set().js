
// 关于集合的方法

function Set () {

	var items = {};

	this.has = function (value){
		return items.hasOwnProperty(value)
	};
	this.add = function (value) {
		if(!this.has(value)){
			items[value] = value;
			return value;
		}else {
			return false;
		}
	};
	this.remove = function (value) {
		if(this.has(value)){

			delete items[value];
			return true;
		}else {
			return false;
		}
	};
	this.clear =  function(){

		items = {};
	};
	this.values  = function () {

		return Object.keys(items)
	};
	this.size = function () {				

		return Object.keys(items).length;
	};
	this.sizeLegacy = function(){		// 等价于 size() 方法

		var count = 0;
		for(var porp in items){

			if(items.hasOwnProperty(porp)){

				++count;
			}
		}
		return count;
	};
	this.values = function() {

		return Object.keys(items);
	};
	this.valueLegacy = function(){		// 等价于values()

		var keys = [];
		for( var key in items){

			keys.push(key)
		}
		return keys;
	};
	this.intersection = function (otherSet){		// 并集

		var intersectionSet = new Set();
		var values = this.values();

		for(var i = 0; i<values.length; i++){

			if(otherSet.has(values[i])){
				intersectionSet.add(values[i])
			}
		}
		return intersectionSet;
	};
	this.difference = function (otherSet) {		// 差集
		var differenceSet = new Set();
		var values = this.values();
		for( var i = 0; i < values.length; i++){
			if(!otherSet.has(values[i])){
				differenceSet.add(values[i]);
			}
		}
		return differenceSet;
	};
	this.subset = function (otherSet) {

		if(this.size() > otherSet.size()){

			return false
		}else {

			var values = this.values();
			for( var i = 0; i <values.length; i++){

				if(!otherSet.has(values[i])){
					return false;
				}
			}
			return true;
		}
	}
};

	var set = new Set();

	console.log(set.values())		// 输入 [1]
	console.log(set.has(1))			// true
	console.log(set.size())		    // 1

	var setA = new Set();
		setA.add(1);
		setA.add(2);
		setA.add(3);
	var setB = new Set();
		setB.add(2);
		setB.add(3);
		setB.add(4);

	var intersectionAB = setA.intersection(setB);
	console.log(intersectionAB.values())







