define([
	'utils'
	], function(utils){
	'use strict';

	var getApis = function($http){
		var apis = {};
		apis.getDeploymentIint = function(param, success, error){
			return utils.http($http, 'get', '/api/v1/organizations/' + param.orgId + '/users/' + param.userId + '/deployments/init', param, success, error);
		};

		apis.deploymentSubmit = function(param, success, error){
			return utils.http($http, 'post', ' /api/v1/organizations/' + param.orgId + '/users/' + param.userId + '/deployments/new', param, success, error);
		};

		return apis;
<<<<<<< HEAD
	};
=======
	};	
>>>>>>> 497c39254dd7c2386a796d12deefb970c5b4bc4f

	var services = {
		module: 'appManage',
		name: 'deploymentService',
		getApis: getApis
	};

	return services;
});