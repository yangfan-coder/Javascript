
	var span = document.createElement("span");
	span.innerHTML = `<xml xmlns="http://www.w3.org/1999/xhtml">
		<block type="variables_get" id="EaezE9)%*e^B{Olq7?Le" x="147" y="34"></block>
		</xml>`;
	var block= span.getElementsByTagName('block')[0];
	var id = block.getAttribute("id")
	console.log(id)