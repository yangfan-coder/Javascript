let FuncLibrary = (function(d, w) {


	let funcs = {
		store: { // 处理本地储存
			set(key, value) { // 存储
				localStorage.setItem(key, JSON.stringify(value));
			},
			get(key) { //获取
				return JSON.parse(localStorage.getItem(key)) || [];
			},
			clear() { // 清除
				return localStorage.clear();
			}
		},
		axios: { // 请求接口
			send(url, callback, method, data, async) {
				//默认异步
				if (async === undefined) {
					async = true;
				}
				let httpRequest = new XMLHttpRequest();
				httpRequest.open(method, url, async);
				httpRequest.onreadystatechange = () => {
					if (httpRequest.readyState == 4) {
						callback(JSON.parse(httpRequest.responseText))
					}
				};
				if (method == 'POST') {
					httpRequest.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
				}
				httpRequest.send(data);
			},
			get(url, data, callback, async) {
				const query = [];
				for (let key in data) {
					query.push(`${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`);
				}
				this.send(`${url}${query.length ? `?${query.join('&')}` : ''}`, callback, 'GET', null, async);
			},
			post(url, data, callback, async) {
				const query = [];
				for (let key in data) {
					query.push(`${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`);
				}
				this.send(url, callback, 'POST', query.join('&'), async);
			}
		},
		provalue: { // 验证工厂
			rePhones: /^1(3|4|5|7|8)\d{9}$/, // 手机号码
			Chinese: /[\u4e00-\u9fa5]/, // 验证中文
			reMail: /^\w+@[a-z0-9]+(\.[a-z]+){1,3}$/, // 邮箱
			moenys: /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/, // 金额钱
			wait: 60, // 定时器
			num: /^\d+$/, // 只能是数字

			phone(value) { // 验证手机号码
				return !this.rePhones.test(value)
			},
			passd(value) { // 验证密码 只验证了6位
				return value.trim().length < 6;
			},
			mail(value) { // 验证邮箱
				return !this.reMail.test(value)
			},
			code(value) { // 验证码
				return value.trim() == "";
			},
			user(value) { // 姓名
				return !this.Chinese.test(value);
			},
			card(value) { // 证件号
				return value.trim() == "";
			},
			countDown(o) { // 验证码倒计时
				let sflt = this;
				if (sflt.wait == 0) {
					o.removeAttribute("disabled");
					o.className = 'active';
					o.value = "免费获取验证码";
					sflt.wait = 60;
				} else {
					if (sflt.wait < 10) {
						o.value = "重新发送(0" + sflt.wait + ")";
						sflt.wait--;
						setTimeout(() => {
							sflt.countDown(o)
						}, 1000)
					} else {
						o.setAttribute("disabled", true);
						o.className = '';
						o.value = "重新发送(" + sflt.wait + ")";
						sflt.wait--;
						setTimeout(() => {
							sflt.countDown(o)
						}, 1000)
					}
				}
			},
			moenyFn(value) { // 验证钱  金额 带小数点
				return !this.moenys.test(value)
			},
			numbers(value) { // 验证数字
				return !this.num.test(value);
			}
		},
		tabfunc(obj, {
			res = "data-id",
			callback
		} = {}) { // 封装简单的tab切换
			let newArr = Array.prototype.slice.call(obj);
			newArr.forEach((element, index) => {
				element.addEventListener("touchstart", function() {

					let _this = this;
					let data = _this.getAttribute(res);

					newArr.forEach((elem) => {
						elem.className = ""
					});

					_this.className = 'active';
					if (data) callback(data);
				}, {
					passive: true
				})
			});
		},
		elastic: { // 电话弹层插件
			show(obj, parentId) {
				let newArr = Array.prototype.slice.call(obj);
				if (!newArr.length) {
					obj.addEventListener("touchstart", touchstartFn, {
						passive: true
					});
				} else {
					newArr.forEach(function(elm) {
						elm.addEventListener("touchstart", touchstartFn, {
							passive: true
						});
					});
				}
				// 点击显示的状态
				function touchstartFn() {
					parentId.style.display = 'block';
					FuncLibrary.doc.clean(parentId);
				}
			},
			hide(obj, parentId) {
				let newArr = Array.prototype.slice.call(obj);
				if (!newArr.length) {
					obj.addEventListener("touchstart", touchstartFn, {
						passive: true
					});
					obj.addEventListener("touchend", function(event) {
						event.preventDefault()
					}, {
						passive: false
					});
				} else {
					newArr.forEach((elm) => {
						elm.addEventListener("touchstart", touchstartFn, {
							passive: true
						});
						elm.addEventListener("touchend", function(event) {
							event.preventDefault()
						}, {
							passive: false
						});
					});
				}
				// 点击隐藏的状态
				function touchstartFn() {
					parentId.style.display = 'none';
					FuncLibrary.doc.reduction();
				}
			},
			PaymentMethod: { // 支付方式弹层
				demos() { // 查找DOM 节点

					let paymentBoxCen = d.querySelector("#payment-box-cen"),
						paymentMasks = paymentBoxCen.querySelectorAll(".payment-mask")[0],
						getMoney = d.querySelector("#get-money"),
						paymentBoxs = paymentBoxCen.querySelectorAll(".payment-boxs"),
						paymentBtn = d.querySelector("#payment-btn")

					return {
						paymentBoxCen, // 获取整个支付方式的center	
						paymentMasks, // 遮罩层
						getMoney, // 金额
						paymentBoxs, // 支付方式的切换
						paymentBtn // 点击确定提交
					};

				},
				userAgent() { // 获取浏览器的信息
					let ua = window.navigator.userAgent.toLowerCase();
					return ua.match(/MicroMessenger/i) == 'micromessenger';
				},
				onHide() { // 隐藏的时候	
					let $ = this.demos();
					$.paymentMasks.addEventListener("touchstart", function() {
						$.paymentBoxCen.style.display = "none";
					}, {
						passive: true
					});
				},
				onShow(money = "8.88") { // 显示的时候
					let $ = this.demos();
					let bUserAgent = this.userAgent();
					$.paymentBoxCen.style.display = "block";
					$.getMoney.innerHTML = `￥${money}`;

					if (bUserAgent) { // 显示的时候 是否是微信
						$.paymentBoxs[1].style.display = "none";
					}

				},
				onTabs(callback) { // 切换支付方式的时候
					let $ = this.demos();
					let dataId = "";
					let newArr = Array.prototype.slice.call($.paymentBoxs);

					newArr.forEach(function(obj, index) {
						obj.addEventListener("touchstart", function() {
							newArr.forEach((element, index) => {
								element.className = "tab payment-boxs";
							});
							this.className = "tab payment-boxs active";
							dataId = this.getAttribute("data-id");
							callback(dataId);
						}, {
							passive: true
						})
					});
				},
				submitFn(callback) { // 点击提交的时候
					let $ = this.demos();
					$.paymentBtn.addEventListener("touchstart", function() {
						callback()
					}, {
						passive: true
					})
				}
			},
			public: { // 公共的弹层
				elm() { // 查找节点
					let oBody = d.querySelectorAll("body")[0];
					let oHtml = d.querySelectorAll("html")[0];
					let getWh = FuncLibrary.page.getWindowHeight();
					return {
						oBody,
						oHtml,
						getWh
					};
				},
				clean(type = 0 ) { // 弹层出现清除默认滚动
					/*
						传入的参数是不是等于0 等于或者不传的话
						那么默认就是不让页面进行滚动
					*/
					let getElm = d.querySelectorAll(".public_projectile")[0];
					let aelm = this.elm();
					if(type == 0 ) {
						if (getElm) {
							hidden(aelm.oBody);
							hidden(aelm.oHtml);
						} else {
							auto(aelm.oBody);
							auto(aelm.oHtml);
						}
					}
					function hidden(obj) {
						obj.style.overflow = 'hidden';
						obj.style.height = aelm.getWh + "px";
					}
					function auto(obj) {
						obj.style.overflow = '';
						obj.style.height = "";
					}
				},
				add(test, {url = "",type = "0"} = {}) { // 为页面添加遮罩层元素
					let aelm = this.elm();
					let element = d.createElement("div");
					let projectile = aelm.oBody.querySelectorAll(".public_projectile")[0];
					if(!!projectile) {
						return false;
					}
					element.className = 'public_projectile';
					element.innerHTML = `
						<div class="public_cen">
				 			<h2>${test}</h2>
				 			<a href="javascript:;">确定</a>
						</div>`
					aelm.oBody.appendChild(element);
					this.close(url);
					this.clean(type);
				},
				close(url = "") { // 关闭遮罩层
					let getElm = d.querySelectorAll(".public_projectile")[0];
					if (!getElm) return false;
					let _this = this;
					let aelm = _this.elm();
					let timer = null;

					getElm.addEventListener("touchstart", function(event) {
						let target = event.target || event.srcElement;
						if (target.nodeName.toLocaleLowerCase() == 'a') {
							// 获取浏览器的版本进行判断
							let us = window.navigator.userAgent.split("/")[5];
							if(us) {
								// 版本号很低的话 那么就加上定时器延迟
								let init = us.split(".")[0];
								if(init < 50) {
									console.warn("版本低于普通浏览器");
									clearTimeout(timer);
									timer = setTimeout(function(){
										aelm.oBody.removeChild(getElm);
									},300);
								}else{
									console.warn("主流浏览器");
									aelm.oBody.removeChild(getElm);
								}
							}else{
								// 苹果手机
								console.warn("主流浏览器");
								aelm.oBody.removeChild(getElm);
							}
							
							_this.clean();
							if (url < 0) {
								window.history.back();
							}
							if (url.indexOf("/") != -1) {
								console.log(url)
								window.location.href = url;
							}
						}
					}, {
						passive: true
					});
					getElm.addEventListener("touchend", function(event) {
						event.preventDefault();
					}, false)
				}
			}
		},
		page: { // 页面的分辨率数据获取
			getScrollTop: function() { // scrollTop
				let scrollTop = 0,
					bodyScrollTop = 0,
					documentScrollTop = 0;　　
				if (d.body) {　　　　
					bodyScrollTop = d.body.scrollTop;　　
				}　　
				if (d.documentElement) {　　　　
					documentScrollTop = d.documentElement.scrollTop;　　
				}　　
				scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;　　
				return scrollTop;
			},
			setScrollTop: function(value) { // 改变scrollTop的值
				if (d.body) {
					d.body.scrollTop = value;　　
				}　　
				if (d.documentElement) {　　　　
					d.documentElement.scrollTop = value;　　
				}
			},
			getScrollHeight: function() { // 文档的高度

				let scrollHeight = 0,
					bodyScrollHeight = 0,
					documentScrollHeight = 0;

				　　
				if (d.body) {　　　　
					bodyScrollHeight = d.body.scrollHeight;　　
				}　　
				if (d.documentElement) {　　　　
					documentScrollHeight = d.documentElement.scrollHeight;　　
				}　　
				scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;　　
				return scrollHeight;
			},
			getWindowHeight: function() { // 浏览器视口的高度
				let windowHeight = 0;　　
				if (d.compatMode == "CSS1Compat") {　　　　
					windowHeight = d.documentElement.clientHeight;　　
				} else {　　　　
					windowHeight = d.body.clientHeight;　　
				}　　
				return windowHeight;
			}
		},
		doc: { // 页面处理的函数
			prevent(event) {
				event.preventDefault();
			},
			clean(obj) { // 添加默认行为
				let _this = this;
				let objs = obj || d.querySelector("#bomb-box");

				let classNames = obj.className.split(" ");
				let newArrs = [...new Set(classNames)];
				const indexs = newArrs.indexOf("active");

				const HTML = d.querySelector("html");
				if (objs.style.display == "block" || indexs > -1) {
					HTML.className = "noscroll";
					document.addEventListener("touchmove", _this.prevent, false);
				} else {
					HTML.className = "";
				}
			},
			reduction() { // 清除默认行为
				let _this = this;
				const HTML = d.querySelector("html");
				HTML.className = "";
				document.removeEventListener("touchmove", _this.prevent, false);
			},
			HTMLclean(obj) { // 不让页面滚动的另一种方案
				let bodys = document.querySelectorAll("body")[0];
				let htmls = document.querySelectorAll("html")[0];
				let getWh = FuncLibrary.page.getWindowHeight();
				let clsNames = obj.className.split(" ");

				if (clsNames[1] == "active") {
					hidden(htmls);
					hidden(bodys);
				} else {
					auto(htmls)
					auto(bodys)
				}

				function hidden(obj) {
					obj.style.overflow = 'hidden';
					obj.style.height = getWh + "px";
				}

				function auto(obj) {
					obj.style.overflow = '';
					obj.style.height = "auto";
				}
			},
			getuserAgent(){	// 判断是不是微信
				let useragent = window.navigator.userAgent.toLowerCase();
				return useragent.match(/MicroMessenger/i) == 'micromessenger';
			},
			getuserAgentType(){		// 判断是不是 apicloud 、HTML5、微信
				let isAtext = $.isApiCloud();	// apicloud 
				let useragent = this.getuserAgent();
				return isAtext != null || useragent;
			},
			browserIs(type = 'wx'){
				let useragent = window.navigator.userAgent.toLowerCase();
				if(type == 'wx'){
					// return useragent.match(/MicroMessenger/i) == 'micromessenger';
					return useragent.indexOf('micromessenger') > -1 ? true : false;
				}else if(type == 'qq'){
					//  微信中也有MQQBrowser
					// return useragent.match(/MQQBrowser/i) == 'mqqbrowser';
					if(useragent.indexOf('mac os')){
						return useragent.indexOf('qq') > -1 ? true : false;
					}else{
						return useragent.indexOf('mqqbrowser') > -1 ? true : false;
					}
				}else if(type == 'wbapp'){
					// return useragent.match(/Weibo/i) == 'weibo';
					return useragent.indexOf('weibo') > -1 ? true : false;
				}else{
					return false;
				}
				
			},
			doIOS(){
				let u = navigator.userAgent;
				return !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); 
			}
		},
		upload: { // 上传
			uploadImg(fileurl, {
				maxW = 50,
				maxH = 50
			} = {}) { // 上传img
				// 压缩图片需要的一些元素和对象
				var reader = new FileReader();
				var Img = new Image();
				var _this = this;

				var imgsrc = "";
				// 传入对象
				var dataURL = null;

				var canvas = document.createElement('canvas');
				var context = canvas.getContext("2d");
				let promise = new Promise(function(resolve, reject) { // 异步调取img的路径
					// base64地址图片加载完成后
					Img.onload = function() {
						// 图片的原始尺寸
						var originWidth = this.width;
						var originHeight = this.height;
						// 最大尺寸限制
						var maxWidth = maxW,
							maxHeight = maxH;
						// 目标尺寸
						var targetWidth = originWidth;
						var targetHeight = originHeight;

						if (originWidth > maxWidth || originHeight > maxHeight) {
							if (originWidth / originHeight > maxWidth / maxHeight) {
								// 更宽，按照宽度限定尺寸
								targetWidth = maxWidth;
								targetHeight = Math.round(maxWidth * (originHeight / originWidth));
							} else {
								targetHeight = maxHeight;
								targetWidth = Math.round(maxHeight * (targetWidth / originHeight));
							}
						}
						// canvas 对图片进行缩放
						canvas.width = targetWidth;
						canvas.height = targetHeight;
						// 清除画布
						context.clearRect(0, 0, targetWidth, targetHeight);
						// 图片压缩
						context.drawImage(Img, 0, 0, targetWidth, targetHeight);
						dataURL = canvas.toDataURL();
						resolve(dataURL)
					};
				})
				reader.onload = function(e) {
					Img.src = e.target.result;
				};
				reader.readAsDataURL(fileurl)
				return promise;
			},
			doc(obj, callback) { // 选取demo上传
				obj.addEventListener("change", (event) => {
					let file = event.target.files[0];
					if (file.type.indexOf("image") == 0) {
						callback(file)
					} else {
						console.error('格式不正确')
					}
				}, false)
			}
		},
		loadstar(children) { // 渲染星星
			for (let i = 0, len = children.length; i < len; i++) {
				let starsList = children[i];
				let iconfont = starsList.children;
				let statusvalue = null;
				if (starsList.querySelectorAll("input")[0]) {
					statusvalue = starsList.querySelectorAll("input")[0].value;
				} else {
					statusvalue = starsList.getAttribute("data-val");
				}
				for (let j = 0; j < statusvalue; j++) {
					iconfont[j].className = "iconfont icon-xingxing1 active";
				}
			}
		},
		class: {
			add(obj, cls) {
				const classNames = obj.className.split(" ");
				classNames.push(cls);
				var newArrs = [...new Set(classNames)];
				obj.className = newArrs.join(' ');
			},
			remove(obj, clas) {
				let classNames = obj.className.split(" ");
				let newArrs = [...new Set(classNames)];
				const index = newArrs.indexOf(clas);
				if (index > -1) {
					newArrs.splice(index, 1)
				}
				obj.className = newArrs.join(' ');
			}
		},
	}
	return funcs;
}(document, window));
