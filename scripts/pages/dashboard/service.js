define([
	'utils'
	], function(utils){
	'use strict';

	var getApis = function($http){
		var apis = {};
		// apis.CreatService = function(param, success, error){
		// 	return utils.http($http, 'get', 'dizhi', param, success, error)
		// }

		return apis;
	};	

	var services = {
		module: 'dashboardManage',
		name: 'dashboardService',
		getApis: getApis
	};

	return services;
});