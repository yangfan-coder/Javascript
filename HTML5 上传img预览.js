$("#img-list").on("change",'.img',function(){
		if(typeof FileReader == 'undefined'){  
		    alert("你的浏览器不支持FileReader接口！") 
		    $(this).off(); 
		    return false
		}	
		var img = this.files[0];
		// 判断是否图片  
        if(!img){  
            return ;  
        }  
		 if(!(img.type.indexOf('image')==0 && img.type && /\.(?:jpg|png|gif)$/.test(img.name)) ){  
            alert('图片只能是jpg,gif,png');  
            return ;  
        }  
		var reader = new FileReader();
		 reader.readAsDataURL(img);
		 reader.onload = function(e){
		 	var imaVal = e.target.result;

		 	$.post("/index.php/common/upload",
		 		{
		 			img:imaVal

		 		},function(data){
		 			
		 			//返回一个数组url
		 			if(data.status){
			 			var str = '<li>'+
							'<a href="javascript:;">'+
								'<img src="'+data.data+'" alt="图像">'+
							'</a>'+
						'</li>';
						$('#img-list').prepend(str);
		 			}else{
		 				alert('上传失败');
		 			}

		 		})
		 }
});