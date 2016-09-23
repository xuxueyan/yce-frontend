define([
	'utils'
	], function(utils){
	'use strict';

	var getApis = function($http){
		var apis = {};
		apis.getOperationLog = function(param, success, error){
			return utils.http($http, 'get', '/api/v1/organizations/' + param.orgId + '/operationlog', param, success, error);
		};

		return apis;

	};


	var services = {
		module: 'appManage',
		name: 'historyService',
		getApis: getApis
	};

	return services;
});