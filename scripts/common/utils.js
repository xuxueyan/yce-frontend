define([
    'ngStorage'
], function(){
	var yce = {};
	yce.preUrl = '';

	yce.http = function($http, method, url, param, success, error){
		$http.defaults.headers.common['Authorization'] = param.sessionId || '';

		$http[method](yce.preUrl + url, param)
		.success(function(data){

		//	console.log(url,data);

			success(data);
		})
		.error(function(){
			if(error && typeof error == 'function') return error();
			console.log('error');
		});
	};

	yce.findInArr = function(arr, str){
		for(var i = 0, length = arr.length; i<length; i++){
			if(str == arr[i])
				return true;
		}
		return false;
	};

	return yce;
});