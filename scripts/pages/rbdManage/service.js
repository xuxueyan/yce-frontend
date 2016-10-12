define([
	'utils'
	], function(utils){
	'use strict';

	var getApis = function($http){
		var apis = {};


		apis.setUpUser = function(param, success, error){
			return utils.http($http, 'get', '/api/v1/user/init', param, success, error)
		}

		apis.setUsernamePost = function(param, success, error){
			return utils.http($http, 'post', '/api/v1/user/check', param, success, error)
		}

		return apis;
	};	

	var services = {
		module: 'rbdManage',
		name: 'rbdManageService',
		getApis: getApis
	};

	return services;
});