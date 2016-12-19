

var str = "りんなに #OOTD をチェックしてもらったよ♪ http://webappsjp-test.azurewebsites.net/imagegame/start?&form=twtask=fashion&r=1481705958025";

console.log( replaceUrlParameters(str,{"form":"666666","r":"2322"}) )

function replaceUrlParameters(url, newParams) {
 if (!url || !newParams) {
  	return url;
 }
 
 var urlParts = url.split('?');
 if (urlParts.length != 2 || urlParts[1] == '') {
     return url;
 }
 var newArr = [];
 var arr = urlParts[1].split('&');

 for(var i = 0; i < arr.length; i++) {
    var pair = arr[i].split('=');
    if (pair.length == 2) {
       if (!(pair[0] in newParams)) {
        	newArr.push(arr[i]);
       }
    }
 }

 for(var key in newParams) {
     newArr.push(key + '=' + newParams[key]);
 }

    return urlParts[0] + '?' + newArr.join('&');
}




function replaceUrlParameters2(url, newParams) {
 if (!url || !newParams) {
      return url;
 }
 
 var urlParts = url.split('?');
 if (urlParts.length != 2 || urlParts[1] == '') {
    return url;
 }

 var copy = Object.assign({}, newParams);
 var arr = urlParts[1].split('&');
 
 for(var i = 0; i < arr.length; i++) {
var pair = arr[i].split('=');
  if (pair.length == 2) {
     if (pair[0] in copy) {
      arr[i] = pair[0] + '=' + copy[pair[0]];
      delete copy[pair[0]];
     }
  }
 }