
/**
 *
 *功能：promise
 *时间：2018-6-14
 *作者：john
 *
 * */
var promise = new Promise(function(resolve,reject){
		var request = new XMLHttpRequest();
		var url ='data.json';
		request.open("GET",url);
		request.addEventListener("load",function(){
			if(request.status ===200){
				resolve(request.responseText);
			}
			else {
				reject("server error"+request.status);
			}
		},false);
		request.addEventListener("error",function(){
			reject("Can not make ajax request");
		},false);
		request.send();
		
	});
