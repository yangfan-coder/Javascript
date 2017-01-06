// 模板类 基础的提示框data渲染数据
		var Alret = function (data) {

			// 没有数据就返回
			if(!data){
				return
			}
			// 设置内容
			this.content = data.content;
			// 创建提示框面板
			this.panel = document.createElement('div');
			// 创建提示内容组件
			this.contentNode = document.createElement('p');
			// 创建确定按钮的组件
			this.confirmBtn = document.createElement('span');
			// 创建关闭按钮组件
			this.closeBtn = document.createElement('b');
			// 为提示框面板添加类
			this.panel.className = "alert";
			// 为关闭按钮添加类
			this.closeBtn.className ='a-close';
			// 为确定按钮添加类
			this.confirmBtn.className ='a-confirm';
			// 为确定按钮添加文案
			this.confirmBtn.innerHTML = data.confirm || "确认";
			// 为提示内容添加文本
			this.contentNode.innerHTML = this.content;
			// 为确定按钮执行方法，如果data中有success方法则为success，否则为空fn
			this.success = data.success || function(){};
			// 为关闭按钮执行方法
			this.fall = data.fall || function(){};

		}
		// 为原型提供方法
		Alret.prototype = {
			// 创建方法
			init:function () {
				// 生成提示框、
				this.panel.appendChild(this.closeBtn);
				this.panel.appendChild(this.contentNode);
				this.panel.appendChild(this.confirmBtn);
				// 插入在页面中
				document.body.appendChild(this.panel);
				// 绑定事件
				this.bindEvent();
				// 显示提示框
				this.show();
			},
			bindEvent:function () {
				var me = this ;
				// 关闭按钮的点击事件
				this.closeBtn.onclick = function () {
					// 执行关闭的取消方法
					me.fail();
					// 隐藏弹层
					me.hide();
				}
				// 确定按钮的点进事件
				this.confirmBtn.onclick = function () {
					// 执行关闭确定的方法
					me.success();
					// 隐藏弹层
					me.hide();
				}
			},
			hide:function () {
				this.panel.style.display ='none';
			},
			// 显示弹层的方法
			show:function (){
				this.panel.style.display ='block';
			}
		}

		// 左侧按钮的提示框
		var RightAlert = function(data){
			// 继承提示框的构造函数
			Alret.call(this,data);
			// 为确定按钮添加right类设置位置居右;
			this.confirmBtn.className = this.confirmBtn.className + "right";
		}
		// 继承弹出框的方法
		RightAlert.prototype = new Alret();

		// 标题提示框
		var TitleAlert = function (data) {
			// 继承提示框的构造函数
			Alret.call(this,data);
			// 设置标题内容
			this.title = data.title;
			// 创建标题组件
			this.titleNode = document.createElement('h3');
			// 标题组件中写入标题内容
			this.titleNode.innerHTML = this.title;
		}
		// 继承弹出框的方法
		TitleAlert.prototype = new Alret();

		// 为基本的弹出创创建放方法的拓展
		TitleAlert.prototype.init = function () {

			// 插入标题
			this.panel.insertBefore(this.titleNode , this.panel.firstChild);
			// 继承基本提示框的init方法
			Alret.prototype.init.call(this);		//有点懵逼
		}


		// 带取消按钮的弹出框
		var CancelAlert = function (data) {
			// 继承提示框的构造函数
			TitleAlert.call(this,data);
			// 取消按钮的文案
			this.cancel = data.cancel;
			// 创建取消按添加的类 
			this.canceBtn = document.createElement('span');
			// 为取消按钮添加类
			this.canceBtn.className = "cancel";
			// 设置取消按钮的内容
			this.canceBtn.innerHTML = this.cancel || "取消";

		}
		// 继承提示弹出框的方法
		CancelAlert.prototype = new Alret();

		CancelAlert.prototype.bindEvent = function () {
			var me = this;
			// 提示框绑定事件的方法继承
			TitleAlert.prototype.bindEvent.call(me);
			// 取消按钮绑定的事件
			this.canceBtn.onclick = function () {
				// 执行取消回调函数
				me.fail();
				// 隐藏弹层
				me.hide();
			}
		}

		new CancelAlert ({
			title :"提示标题",
			content :"提示内容",
			success:function() {
				console.log('ok');
			},
			fail:function(){

				console.log('cancel')
			}
		}).init();