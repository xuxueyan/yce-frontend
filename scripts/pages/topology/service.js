define([
	'utils'
	], function(utils){
	'use strict';

	var getApis = function($http){
		var apis = {};
		apis.getDatasets = function(param, success, error){
		    return utils.http($http, 'get', '/api/v1/organizations/' + param.orgId + '/topology', param, success, error);
		};

		return apis;
	};	

	var services = {
		module: 'topology',
		name: 'topologyService',
		getApis: getApis
	};

	return services;
});