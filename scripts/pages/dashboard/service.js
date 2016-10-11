define([
	'utils'
	], function(utils){
	'use strict';

	var getApis = function($http){
		var apis = {};
		apis.getResData = function(param, success, error){
			return utils.http($http, 'get', 'resource.json', param, success, error)
		};
		apis.getApplyData = function(param, success, error){
			return utils.http($http, 'get', 'apply.json', param, success, error)
		};


		return apis;
	};	

	var services = {
		module: 'dashboardManage',
		name: 'dashboardService',
		getApis: getApis
	};

	return services;
});