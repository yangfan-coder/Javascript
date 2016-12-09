var str ="http://webappsjp-test.azurewebsites.net/imagegame/start?task=fashion&form=tw*$$$&&&r=1481168980178";
			function GetQueryString(name) {
				var reg = new RegExp("(^|&)" + name + "=([^]*)(|$)");
				var r = str.substr(1).match(reg);
				if (r != null) return unescape(r[0]);
				return null;
			}
			// 获取form后面的字符串
console.log(GetQueryString('form'))