define([
	'utils'
	], function(utils){
	'use strict';

	var getApis = function($http){
		var apis = {};
		apis.getDeploymentIint = function(param, success, error){
			return utils.http($http, 'get', '/api/v1/organizations/' + param.orgId + '/users/' + param.userId + '/deployments/new', param, success, error);
		};

		apis.deploymentSubmit = function(param, success, error){
			return utils.http($http, 'post', ' /api/v1/organization/' + param.orgId + '/users/' + param.userId + '/deployments', param, success, error);
		};

		return apis;
	};	

	var services = {
		module: 'appManage',
		name: 'deploymentService',
		getApis: getApis
	};

	return services;
});