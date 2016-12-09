var str ="http://webappsjp-test.azurewebsites.net/imagegame/start?task=fashion&form=tw&r=1481168980178";

			// 思路
			if( str.indexOf('&form') || str.indexOf('&r')){			
				var a1 = str.indexOf('&form');	
				var a2 = str.indexOf('&r');

				var a3 = str.substring(a2,a2.length).indexOf('&',1);
				var a4 = str.substring(a2,a2.length).indexOf('&',0);
				var a5 = str.substring(a1,a1.length).indexOf('&',1);
				var a6 = str.substring(a1,a1.length).indexOf('&',0);
				var b1,b2;


				var yangfans = show();
				console.log(yangfans)
				function show(){
					if(a3 != -1){	
						 b1 = str.substring(a1,a1+a5);	
						 b2 = str.substring(a2,a2+a3);
						 console.log(1)
						 console.log(b2)
					}else{
					
						b1 = str.substring(a1,a1+a5);		
						b2 = str.substring(a2);
						console.log(2)
						 console.log(b2)
					}
					return b1+b2;
				}
			}

			// 完整版的封装方法
			function SubString(url,josn){

				josn ={
					start :'&form',
					end :'&r'
				};
				if( url.indexOf(josn.startFn) || url.indexOf(josn.endFn)){	
					var start = url.indexOf(josn.start);	
					var end = url.indexOf(josn.end);
					function Encapsulation (val,mumber){
						return url.substring(val,val.length).indexOf('&',mumber);
					}
					function SubStrings(str){
						return url.substring(str,str + Encapsulation(str,1));
					}
					return function(){
						if( Encapsulation(end,1) != -1){	

							 return SubStrings(start) + SubStrings(end);

						}else{

							 return  SubStrings(start) + url.substring(end);		
						}
					}
				}
			}
			var SubStringFn = SubString(str,{start:'&form',end:'&r'})();