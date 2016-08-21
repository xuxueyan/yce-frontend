define([], function(){
	var yce = {};
	yce.preUrl = 'http://10.0.0.1:8080';

	yce.http = function($http, method, url, param, success, error){
		$http.defaults.headers.common['Authorization'] = param.sessionId || '';

		$http[method](yce.preUrl + url, param)
		.success(function(data){
				console.log(url,data);
			success(data);
		})
		.error(function(){
			if(error && typeof error == 'function') return error();
			console.log('error');
		});
	};

	return yce;
});