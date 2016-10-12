define([
	'utils'
	], function(utils){
	'use strict';

	var getApis = function($http){
		var apis = {};
		apis.getResData = function(param, success, error){
			var orgId = param.orgId;
			return utils.http($http, 'get', '/api/v1/organizations/'+ orgId +'/resourcestat', param, success, error)
		};
		apis.getApplyData = function(param, success, error){
			var orgId = param.orgId;
			return utils.http($http, 'get', '/api/v1/organizations/'+ orgId +'/deploymentstat', param, success, error)
		};
		apis.getHandleData = function(param, success, error){
			var orgId = param.orgId;
			return utils.http($http, 'get', '/api/v1/organizations/'+ orgId +'/operationstat', param, success, error)
		}


		return apis;
	};	

	var services = {
		module: 'dashboardManage',
		name: 'dashboardService',
		getApis: getApis
	};

	return services;
});