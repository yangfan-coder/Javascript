/*
	图片压缩上传：
		eleFile：点击上传的元素
		parent：点击上传元素的父级
		maxW：压缩图片的最大width
		maxH：压缩图片的最大height
	
	应用于结构内容：
	 <ul id = parent >
		 <li>
			<a href="javascript:;">
				<img src='' id= eleFile >
			</a>
		 </li>
	 </ul>
 */
function newUploadFn(eleFile,parent,maxW,maxH){
	// 压缩图片需要的一些元素和对象
	var reader = new FileReader();
	var Img = new Image();

	// 选择文件对象
	var file = null;
	// 传入对象
	var dataURL = null;

	var canvas = document.createElement('canvas');
	var context = canvas.getContext("2d");
	// base64地址图片加载完成后
	Img.onload = function(){
		// 图片的原始尺寸
		var originWidth = this.width;
		var originHeight = this.height;
		// 最大尺寸限制
		var maxWidth = maxW,maxHeight = maxH;
		// 目标尺寸
		var targetWidth = originWidth;
		var targetHeight = originHeight;

		if(originWidth > maxWidth ||  originHeight > maxHeight){
			// 图片尺寸超出了200*150的限制
			if(originWidth/originHeight > maxWidth/maxHeight){
				// 更宽，按照宽度限定尺寸
				targetWidth = maxWidth;
				targetHeight = Math.round(maxWidth * (originHeight / originWidth) );
			}else{
				targetHeight = maxHeight;
				targetWidth = Math.round(maxHeight * (targetWidth / originHeight) );
			}
		}
		// canvas 对图片进行缩放
		canvas.width = targetWidth;
		canvas.height = targetHeight;
		// 清除画布
		context.clearRect(0,0,targetWidth,targetHeight);
		// 图片压缩
		context.drawImage(Img,0,0,targetWidth,targetHeight);
		// 压缩编码为base64传入后台
		dataURL = canvas.toDataURL();

		$.post("/index.php/common/upload",
	 		{
	 			img:dataURL

	 		},function(data){
	 			if(data.status){
		 			var str = '<li>'+
						'<a href="javascript:;">'+
							'<img src="'+data.data+'" alt="图像">'+
						'</a>'+
					'</li>';
					$(parent).prepend(str);
	 			}else{
	 				alert('上传失败');
	 			}
 		})
	};
	reader.onload = function(e){
		Img.src = e.target.result;
	};
	eleFile.addEventListener("change",function(event){
		file = event.target.files[0];
		if(file.type.indexOf("image") == 0){
			reader.readAsDataURL(file)
		}
	})
}

