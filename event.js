// 创建一个对象函数 方便下次调用

var eventUtil = {

	// 绑定事件
	addHandler : function (element,type,handler)
	{
		// 主流的浏览器
		if( element.addEventListener )
		{
			element.addEventListener(type,handler,false);

		} //IE 里面的事件流
		else if(element.attachEvent)
		{

			element.attachEvent('on'+type,handler)
		} //IE 8 以前不支持的事件
		else {

			element["on"+ type] = handler;
		}
	},
	// 删除绑定的事件
	removeHandler : function()
	{
		// 主流的浏览器
		if( element.removeEventListener )
		{
			element.removeEventListener(type,handler,false);

		} //IE 里面的事件流
		else if(element.detaachEvent)
		{

			element.detaachEvent('on'+type,handler)
		} //IE 8 以前不支持的事件
		else {

			element["on"+ type] = null;
		}

	},
	//  事件对象
	getEvent : function (event)
	{

		return  event?event:window.event;
	},
	// 事件类型
	getType : function (event)
	{

		return event.type;
	},
	// 事件元素
	getElement : function (event)
	{
		return event.target || event.srcElement;

	},
	// 事件的默认行为
	preventDefault: function (event)
	{
		if( event.preventDefault )
		{
			event.preventDefault();
		}else{

			event.returnValue = false;
		}

	},
	// 阻止事件冒泡
	stopPropagation : function (event)
	{

		if(event.stopPropagation)
		{

			event.stopPropagation();
		}else{

			event.cancelBubble = true;
		}
	}

}