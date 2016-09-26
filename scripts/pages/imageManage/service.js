define([
	'utils'
	], function(utils){
	'use strict';

	var getApis = function($http){
		var apis = {};


		apis.myImageManage = function(parameter,success,error){
			return utils.http($http, 'get', '/api/v1/registry/images',parameter,success,error);

		};
		return apis;
	};	

	var services = {
		module: 'imageManage',
		name: 'imageManageService',
		getApis: getApis
	};

	return services;
});

